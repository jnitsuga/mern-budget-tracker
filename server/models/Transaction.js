const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'createdBy is required'],
    ref: 'User',
  },
  category: {
    type: String,
    required: [true, 'category is required'],
  },
  currency: {
    type: String,
    required: [true, 'currency is required']
  },
  amount: {
    type: Number,
    required: [true, 'amount is required']
  },
  description: {
    type: String,
    default: null
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema)