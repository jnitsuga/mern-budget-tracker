const UserModel = require('../models/User')
const auth = require('../middleware/authMiddleware')
const TransactionModel = require('../models/Transaction')
const UserController = require('../controllers/userController')

// @desc    Get transactions
// @route   GET /api/transactions/getAllTransactions
// @access  Private
const getAllTransactions = async (req, res) => {
  TransactionModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

const getMyTransactions = async (req, res) => {
  console.log('Verifying user...')
  const user = auth.decode(req.headers.authorization)
  UserController.getMe({ userId: user.id })
  console.log(user.id)

  const transaction = await TransactionModel.find({ createdBy: user.id })

  res.status(200).send(transaction)  
}

// @desc    Create transaction
// @route   POST /api/transactions/createTransaction
// @access  Private
const createTransaction = async (req, res) => {
  if (!req.res.body) {
    res.status(400)
  }

  console.log('Verifying user...')
  const user = auth.decode(req.headers.authorization)
  UserController.getMe({ userId: user.id })

  console.log('Creating transaction...')
  const transaction = await TransactionModel.create({
    createdBy: user.id,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
  })

  res.status(201).send(transaction)
}

// @desc    Update vaccine entry
// @route   PUT /api/vaccines/:id
// @access  Private
const updateTransaction = async (req, res) => {
  res.status(200).json({message: `Update vaccine ${req.params.id}` })
}

// @desc    Delete vaccine entry
// @route   DELETE /api/vaccines/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const user = auth.decode(req.headers.authorization)
  UserController.getMe({ userId: user.id })

  const id = req.params.id
  const transaction = await TransactionModel.findById(id)

  if (transaction.createdBy.valueOf() !== user.id) {
    res.status(401).json({message: 'Unauthorized'})
  } else {
    await TransactionModel.findByIdAndRemove(id).exec()
    res.status(200).json({message: `Deleted transaction ${id}` })
  }
}

module.exports = {
  getAllTransactions,
  getMyTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}