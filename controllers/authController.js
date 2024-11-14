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
                status: "error",
                message: "User already exists",
                error: {
                    details: "The user has registered an account with the same email address",
                }
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

        res.status(200).json({
            status: "success",
            message: "User registered successfully",
            data: {
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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. Please check your username and password."
                }
            });
        }

        // Periksa password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. Please check your username and password."
                }
            });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                token: token
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: {
                details: "An unexpected error occurred"
            }
        });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                error: { details: "No user found with the given ID." }
            });
        }
        res.status(200).json({
            status: "success",
            message: "User profile fetched successfully",
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: { details: "An unexpected error occurred" }
        });
    }
};


exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                error: { details: "No user found with the given ID." }
            });
        }

        // Update fields if they are provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({
            status: "success",
            message: "User profile updated successfully",
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: { details: "An unexpected error occurred" }
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                error: { details: "No user found with the given ID." }
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: { details: "An unexpected error occurred" }
        });
    }
};
