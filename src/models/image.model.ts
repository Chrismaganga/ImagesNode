
import { pool } from "../config/db";


export interface Image {
  id: number;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

export const getAllImages = async (): Promise<Image[]> => {
  const result = await pool.query("SELECT * FROM images");
  return result.rows;
};

export const saveImage = async (image: Omit<Image, "id">): Promise<Image> => {
  const result = await pool.query(
    "INSERT INTO images (filename, path, size, mimetype) VALUES ($1, $2, $3, $4) RETURNING *",
    [image.filename, image.path, image.size, image.mimetype]
  );
  return result.rows[0];
};
export const deleteImageById = async (id: number): Promise<Image | null> => {
    const result = await pool.query("DELETE FROM images WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] || null;
};