const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const animalsRoutes = require('./routes/animalRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
// Middleware untuk parsing JSON
app.use(express.json());

// Rute AuthRoutes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use("/api/animals", animalsRoutes);

module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});