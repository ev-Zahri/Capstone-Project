const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', authenticateToken, register);
router.post('/login', authenticateToken, login);

module.exports = router;
