require('dotenv').config()
const cors = require("cors");
const PORT = process.env.PORT;
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const adminRoutes = require("./routes/adminRoutes");
const officerRoutes = require("./routes/officerRoutes");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }); // Basic multer config


// express app
const app = express()

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/register', userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/officer", officerRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })