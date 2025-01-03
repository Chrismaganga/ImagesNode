import { Router } from "express";
import { getImages, uploadImage } from "../controllers/imageController";
import { upload } from "../middlewares/multerConfig";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getImages);

export default router;
