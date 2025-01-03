"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const multerConfig_1 = require("../middlewares/multerConfig");
const router = (0, express_1.Router)();
router.post("/upload", multerConfig_1.upload.single("image"), imageController_1.uploadImage);
router.get("/images", imageController_1.getImages);
exports.default = router;
