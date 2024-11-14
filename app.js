const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Connect ke MongoDB
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute Auth
app.use('/api/auth', authRoutes);

module.exports = app;
