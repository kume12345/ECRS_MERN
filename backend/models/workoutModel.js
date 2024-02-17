const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  crimeType: {
    type: String,
    required: true
  },
  when: {
    type: String,
    required: true
  },
  where: {
    type: String, // Changed from Date to String
    required: true
  },
  describe: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
