const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')

//Controllers
const { 
  getAllTransactions,
  getMyTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

router.post('/createTransaction', auth.verify, createTransaction)

router.route('/:id').put(auth.verify, updateTransaction).delete(auth.verify, deleteTransaction);
// #note    shortened version since both of them use the same route '/:id'
// router.put('/:id', updateVaccineEntry)
// router.delete('/:id', deleteVaccineEntry)

router.get('/getAllTransactions', getAllTransactions)

router.get('/getMyTransactions', auth.verify, getMyTransactions)

module.exports = router;