import express from "express";
import { addFood, listFood, removeFood, editFood } from "../controllers/foodController.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", authMiddleware, removeFood);
foodRouter.post("/edit", authMiddleware, upload.single("image"), editFood);

export default foodRouter;