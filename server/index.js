const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')



//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())

app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})

// #note advanced connect function
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect((process.env.MONGO_URI), {
//       useNewUrlParser: true,
//     })
//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch(error) {
//     console.log(error)
//     process.exit(1)
//   }
// }
// connectDB();

// #note what the requests looked like before putting them in the controller
// app.post('/api/createUser', async (req, res) => {
//   const user = req.body
//   const newUser = new UserModel(user)
//   await newUser.save();

//   res.json(user)
// })

// app.get('/api/getUsers', (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err)
//     } else {
//       res.status(200).json(result)
//     }
//   })
// })