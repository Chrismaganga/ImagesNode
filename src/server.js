const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

// Upload a single file and log details in JSON format
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    const errorResponse = { message: "No file uploaded" };
    console.log(JSON.stringify(errorResponse, null, 2));
    return res.status(400).json(errorResponse);
  }

  const imageData = {
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype,
  };

  console.log(JSON.stringify({ action: "upload", data: imageData }, null, 2));
  res.json({ message: "Image uploaded successfully", data: imageData });
});

// API to retrieve all uploaded images and log results as JSON
app.get("/images", (req, res) => {
  const uploadPath = path.join(__dirname, "uploads");

  if (!fs.existsSync(uploadPath)) {
    const emptyResponse = { message: "No images found", data: [] };
    console.log(JSON.stringify(emptyResponse, null, 2));
    return res.json(emptyResponse);
  }

  const images = fs.readdirSync(uploadPath).map((file) => ({
    filename: file,
    path: `/uploads/${file}`,
  }));

  const successResponse = { message: "Images retrieved successfully", data: images };
  console.log(JSON.stringify(successResponse, null, 2));
  res.json(successResponse);
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  const errorResponse = { error: err.message };
  console.error(JSON.stringify(errorResponse, null, 2));
  res.status(500).json(errorResponse);
});

// Start server and log server start information
app.listen(PORT, () => {
  console.log(JSON.stringify({ message: `Server running at http://localhost:${PORT}` }, null, 2));
});
