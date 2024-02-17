const express = require('express')
const multer = require('multer')


const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Images stored in a folder called 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You might want unique names - explore Multer docs
  }
});

const upload = multer({ storage: storage });

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', upload.single('image'), (req, res, next) => {
  console.log(req.file.path);
  console.log(req.body.title)
  // Error handling for file upload
  if (!req.file) {
    const error = new Error('No image uploaded');
    error.status = 400;
    return next(error);
  }
  createWorkout(req, res); // Call createWorkout controller function
});

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router