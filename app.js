const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const animalsRoutes = require('./routes/animalRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
// Middleware untuk parsing JSON
app.use(express.json());

// Rute AuthRoutes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/animals", animalsRoutes);
app.use("/api/quizzes", quizRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});