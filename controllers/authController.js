const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah user sudah terdaftar
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                status: "Failed",
                message: "User already exists",
            });
        }

        // Buat user baru
        user = new User({
            name,
            email,
            password,
        });

        // Simpan user ke database
        await user.save();

        // Buat token JWT
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ 
            status: "success",
            message: "User registered successfully",
            data: {
                userId: user.id,
                username: user.name,
                email: user.email,
                token: token
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: {
              code: 500,
              details: "An unexpected error occurred"
            }
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Periksa password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            status: "success",
            message: "User login successfully",
            data: {
                email: user.email,
                token: token
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: {
              code: 500,
              details: "An unexpected error occurred"
            }
        });
    }
};