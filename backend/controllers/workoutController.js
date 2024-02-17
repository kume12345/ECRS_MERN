const Workout = require('../models/workoutModel')
const Resolved = require('../models/resolvedModel')
const Approved = require('../models/approvedModel')
const mongoose = require('mongoose')
const multer = require('multer')


// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
  const { title, crimeType, where, when, describe, status } = req.body;
  const imagePath = req.file ? req.file.path : null;
  console.log(title);
  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!crimeType) {
    emptyFields.push('crimeType');
  }
  if (!imagePath) {
    emptyFields.push('image');
  }
  if (!where) {
    emptyFields.push('where');
  }
  if (!when) {
    emptyFields.push('when');
  }
  if (!describe) {
    emptyFields.push('describe');
  } else if (describe.trim() === '') { // Handle empty describe
    emptyFields.push('describe');
  }
  if (!status) {
    emptyFields.push('status');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, crimeType, where, when, describe, status, imagePath, user_id });
    if(status === "Approved"){
      await Workout.updateOne({ title, crimeType, where, when, describe, status:"Approved", imagePath, user_id })
      await Approved.create({ title, crimeType, where, when, describe, status, imagePath, user_id })
    }else if(Resolved === "Resolved"){
      await Workout.updateOne({ title, crimeType, where, when, describe, status:"Resolved", imagePath, user_id })
      await Resolved.create({ title, crimeType, where, when, describe, status, imagePath, user_id })
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}