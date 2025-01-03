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
exports.deleteImageById = exports.saveImage = exports.getAllImages = void 0;
const db_1 = require("../config/db");
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query("SELECT * FROM images");
    return result.rows;
});
exports.getAllImages = getAllImages;
const saveImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query("INSERT INTO images (filename, path, size, mimetype) VALUES ($1, $2, $3, $4) RETURNING *", [image.filename, image.path, image.size, image.mimetype]);
    return result.rows[0];
});
exports.saveImage = saveImage;
const deleteImageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query("DELETE FROM images WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] || null;
});
exports.deleteImageById = deleteImageById;
