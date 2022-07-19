const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware')

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

router.get('/me', auth.verify, (req, res) => {
  const user = auth.decode(req.headers.authorization)
  UserController.getMe({ userId: user.id }).then(user => res.send(user))
})

module.exports = router;