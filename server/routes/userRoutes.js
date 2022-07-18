const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const { 
  getUsers, 
  registerUser,
  usernameExists,
  loginUser,
  getMe,
} = require('../controllers/userController');

router.get('/getUsers', getUsers);
router.post('/register', registerUser);
router.post('/username-exists', usernameExists);
router.post('/login', loginUser);
router.get('/me', getMe);

// router.post('/username-exists', (req, res) => {
//   UserController.usernameExists(req.body).then(result => res.send(result));
// });

module.exports = router;