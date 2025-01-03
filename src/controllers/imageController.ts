import { Request, Response } from "express";
import { getAllImages, saveImage, deleteImageById } from "../models/image.model";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
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
    const savedImage = await saveImage(image);
    res.json({ message: "Image uploaded successfully", data: savedImage });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getImages = async (_req: Request, res: Response) => {
  try {
    const images = await getAllImages();
    res.json({ message: "Images retrieved successfully", data: images });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedImage = await deleteImageById(Number(id));
        if (!deletedImage) {
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};