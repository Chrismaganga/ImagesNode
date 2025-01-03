import express, { Application } from "express";
import path from "path";
import imageRoutes from "./routes/imageRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import multer from "multer";

const app: Application = express();

  const PORT = process.env.PORT || 3000;
// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../public/html")));

// Routes
app.use("/api", imageRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle image uploads
app.post("/upload", upload.single("image"), (req: express.Request, res: express.Response): void => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
  } else {
    res.status(200).send("File uploaded successfully.");
  }
});