"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.getImages = exports.uploadImage = void 0;
const image_model_1 = require("../models/image.model");
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    const image = {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
    };
    try {
        const savedImage = yield (0, image_model_1.saveImage)(image);
        res.json({ message: "Image uploaded successfully", data: savedImage });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.uploadImage = uploadImage;
const getImages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield (0, image_model_1.getAllImages)();
        res.json({ message: "Images retrieved successfully", data: images });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getImages = getImages;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedImage = yield (0, image_model_1.deleteImageById)(Number(id));
        if (!deletedImage) {
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json({ message: "Image deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteImage = deleteImage;
