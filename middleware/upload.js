const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat menyimpan file yang diunggah
    },
    filename: (req, file, cb) => {
        // Ambil ekstensi file dari file asli
        const ext = file.mimetype.split('/')[1];
        const uniqueFileName = `${Date.now()}_${uuidv4().replace(/-/g, '').slice(0, 8)}.${ext}`;
        cb(null, uniqueFileName);
    },
});

exports.upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
        cb(null, true);
    },
});
