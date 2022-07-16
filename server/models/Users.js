const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'firstName is required']
	},
	lastName: {
		type: String,
		required: [true, 'lastName is required']
	},
	username: {
		type: String,
		required: [true, 'username is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	email: {
		type: String
	},
	mobileNo: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: false 
	},
	vaccines: [
    {
      vaccineName: {
        type: String
      },
      dateReceived: {
        type: Date,
        default: new Date()
      },
      dateNextDue: {
        type: Date,
        default: new Date()
      }  
    }
	]
})

module.exports = mongoose.model('users', UserSchema)