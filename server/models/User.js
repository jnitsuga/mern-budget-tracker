const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
	// transactions: [
  //   {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Transaction'
	// 	}
	// ],
},
{
	timestamps: true
});

// userSchema.pre('save', async function() {
// 	//logic for bcrypt
// 	//needs a salt
// 	const salt = await bcrypt.genSalt(10)
// 	this.password = await bcrypt.hash(this.password, salt)
// })

// //verify password
// userSchema.methods.isPasswordValid = async function(enteredPassword) {
// 	return await bcrypt.compare(enteredPassword, this.password);
// }

module.exports = mongoose.model('User', userSchema)