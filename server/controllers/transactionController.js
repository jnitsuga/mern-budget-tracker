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
  const user = auth.decode(req.headers.authorization)
  UserController.getMe({ userId: user.id })

  const transaction = await TransactionModel.find({ createdBy: user.id })

  res.status(200).send(transaction)  
}

// @desc    Create transaction
// @route   POST /api/transactions/createTransaction
// @access  Private
const createTransaction = async (req, res) => {
  try {
    const user = auth.decode(req.headers.authorization)
    UserController.getMe({ userId: user.id })

    await TransactionModel.create({
      createdBy: user.id,
      category: req.body.category,
      currency: req.body.currency,
      amount: req.body.amount,
      description: req.body.description,
    })
    
    const transactions = await TransactionModel.find({ createdBy: user.id })
    res.status(201).send(transactions)
  }
  catch {
    res.status(400)
  }
}

// @desc    Update vaccine entry
// @route   PUT /api/vaccines/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const user = auth.decode(req.headers.authorization)
    UserController.getMe({ userId: user.id })

    const id = req.params.id
    const transaction = await TransactionModel.findById(id)

    if (transaction.createdBy.valueOf() === user.id) {
      await TransactionModel.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      const transactions = await TransactionModel.find({ createdBy: user.id })
      res.status(200).send(transactions)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  }
  catch {
    res.status(500).send({ message: 'Internal server error' })
  }
}

// @desc    Delete vaccine entry
// @route   DELETE /api/vaccines/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const user = auth.decode(req.headers.authorization)
    UserController.getMe({ userId: user.id })

    const id = req.params.id
    const transaction = await TransactionModel.findById(id)

    if (transaction.createdBy.valueOf() == user.id) {
      await TransactionModel.findByIdAndRemove(id).exec()
      const transactions = await TransactionModel.find({ createdBy: user.id })
      res.status(200).send(transactions)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  }
  catch {
    res.status(500).send({ message: 'Internal server error' })
  }
}

module.exports = {
  getAllTransactions,
  getMyTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}