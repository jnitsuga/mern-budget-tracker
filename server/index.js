const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const cors = require('cors')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://jang818:coderman@cluster0.he69s.mongodb.net/vaccine-tracker?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

app.post('/createUser', async (req, res) => {
  const user = req.body
  const newUser = new UserModel(user)
  await newUser.save();

  res.json(user)
})

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

app.listen(4000, () => {
  console.log(`Serving is running on port 4000...`)
})