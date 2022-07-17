const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')

// @desc    Get users
// @route   GET /api/users/getUsers
// @access  Admin
const getUsers = async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.status(200).json(result)
    }
  })
}

// @desc    Register new user
// @route   POST /api/users/registerUser
// @access  Public
const registerUser = async (req, res) => {
  const userExists = await UserModel.findOne({ username: req.body.username })
  if(userExists) {
    res.json({
      message: 'Username already exists'
    })
  }

  try {
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      mobileNo: req.body.mobileNo
    })
      await newUser.save()
  } catch(error) {
    res.json(error)
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const userFound = await UserModel.findOne({ username: req.body.username })
  if (userFound && (await userFound.isPasswordValid(req.body.password))) {
    res.json({
      message: 'You have successfully logged in'
    })
  } else {
    res.json({
      message: 'Wrong login credentials'
    })
  }
}

// @desc    Get user data
// @route   POST /api/users/me
// @access  Public
const getMe = async (req, res) => {
  res.status(200).json({message: 'getMe' })
}

module.exports = {
  getUsers, 
  registerUser,
  loginUser,
  getMe,
}