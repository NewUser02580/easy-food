import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import { cloudinary } from "../config/cloudinary.js";

const addFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.path, // ✅ Cloudinary returns full URL in path
      });
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      // delete from cloudinary
      if (food.image && food.image.includes("cloudinary")) {
        const publicId = food.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`easyfood/${publicId}`);
      }
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const editFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.json({ success: false, message: "Food not found" });
      }
      const updatedData = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
      };
      if (req.file) {
        // delete old image from cloudinary
        if (food.image && food.image.includes("cloudinary")) {
          const publicId = food.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`easyfood/${publicId}`);
        }
        updatedData.image = req.file.path;
      }
      await foodModel.findByIdAndUpdate(req.body.id, updatedData);
      res.json({ success: true, message: "Food Updated" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log("editFood error:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood, editFood };