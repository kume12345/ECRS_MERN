const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("function trigger")
  try {
    // Attempt to find the user by email
    const userdeta = await User.findOne({ email: email });
    if (!userdeta) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Assuming User.login does password verification and returns the user if successful
    const user = await User.login(email, password);

    // Assuming createToken is a defined function elsewhere that generates a JWT or similar token
    const token = createToken(user._id);

    // Respond with email, token, and role
    res.status(200).json({ email, token, role: userdeta.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// signup a user
const signupUser = async (req, res) => {
  const {name, nic, email, role, username, password} = req.body

  try {
    const user = await User.signup(name, nic, email, role, username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }