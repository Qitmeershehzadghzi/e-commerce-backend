import multer from "multer";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // uploads folder zaroor bana lena
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // file ka naam same rahega
  },
});

// Upload middleware
const upload = multer({ storage });

export default upload;
