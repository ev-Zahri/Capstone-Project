const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

let animalDataset = [];

// Muat dataset dari file CSV saat server dimulai
const loadAnimalDataset = async () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "../assets/animals_dataset.csv");
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data) => {
                // Konversi fakta dari string ke array
                data.facts = data.facts.split("|");
                results.push(data);
            })
            .on("end", () => {
                animalDataset = results;
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    });
};

// GET /api/animals
const getAllAnimals = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Success fetching animals",
            data: animalDataset
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error fetching animals",
            error: {
                details: error.message
            }
        });
    }
};

// GET /api/animals/:animalId
const getAnimalById = async (req, res) => {
    const { animalId } = req.params;
    try {
        const animal = animalDataset.find((a) => a.id === animalId);
        if (!animal) {
            return res.status(404).json({
                status: 404,
                message: "Animals not found",
                error: {
                    details: "The animals not found in database.",
                },
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Success fetching animals",
            data: animal
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error fetching animal by ID",
            error: {
                details: error.message
            }
        });
    }
};

// Ekspor fungsi dan inisialisasi dataset
module.exports = { getAllAnimals, getAnimalById, loadAnimalDataset };
