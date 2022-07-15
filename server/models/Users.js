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
	mobileNo: {
		type: String
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
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