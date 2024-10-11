// middleware/uploadImage.js
import multer from 'multer';

// ---------- Seting up the Multer to handle file uploads ----------
const upload = multer({
    storage: multer.memoryStorage(),  // ---------- Store file in memory temporarily
    limits: { fileSize: 5 * 1024 * 1024 }, // ---------- Limiting the file size to 5MB
});

export default upload;
