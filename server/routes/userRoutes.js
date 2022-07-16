const express = require('express');
const router = express.Router();

const { 
  getUsers, 
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;