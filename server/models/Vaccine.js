const mongoose = require('mongoose')

const vaccineSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  vaccineName: {
    type: String,
    required: [true, 'vaccineName is required']
  },
})

module.exports = mongoose.model('Vaccine', vaccineSchema)