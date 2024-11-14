const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUser
} = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

// Rute untuk registrasi dan login (tidak perlu autentikasi)
router.post('/register', register);
router.post('/login', login);

// Rute untuk profil user (butuh autentikasi)
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUser);

module.exports = router;
