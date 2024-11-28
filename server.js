const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const { loadAnimalDataset } = require("./controllers/animalController");
// const animalsRoutes = require('./routes/animalRoutes');

// loadAnimalDataset()
//     .then(() => {
//         console.log("Animal dataset loaded.");
//         const PORT = process.env.PORT || 5000;
//         app.use("/api/animals", animalsRoutes);

//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Failed to load animal dataset:", error);
//     });
