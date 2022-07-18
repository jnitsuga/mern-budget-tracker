const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const auth = require('../auth')
const User = require('../models/User')

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
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    mobileNo: req.body.mobileNo
  })

  const userExists = await UserModel.findOne({ username: req.body.username })

  if (!newUser.firstName || !newUser.lastName || !newUser.username) {
    return res.status(400).json({'message': 'Missing required inputs'})
  } else if (userExists) { 
    return res.status(400).json({'message': 'That username is already taken'})
  } else {
    await newUser.save()
    .then(user => res.status(201).json(`User ${user.username} successfully registered!`))
    .catch(err => res.status(400).json('Error:' + err))
  }
}

const usernameExists = (req, res) => {
  return UserModel.find({ username: req.body.username })
  .then(result => {
    return result.length > 0 ? true : false
  })
  .then(result => {
    res.send(result)
  })
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  await UserModel.findOne({ username: req.body.username }).then(user => {
    if(!user) {
      return (
          false,
          res.json(`Error: couldn't find user with username of ${req.body.username}`)
      )
    }

    const isPasswordMatched = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordMatched) {
      return false,
      res.json('Invalid username/password')
    }

    const accessToken = auth.createAccessToken(user)
    return (
      { accessToken: accessToken }, 
      res.json(`User ${user.username} successfully logged in`)
    )
  })
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
  usernameExists,
  loginUser,
  getMe,
}