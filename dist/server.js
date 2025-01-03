"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Routes
app.use("/api", imageRoutes_1.default);
// Serve uploaded files statically
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
