import multer from "multer";

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use Date.now() (capital D)
    }
});

// File filter to accept only certain image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'), false); // Reject the file
    }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

export default upload;
