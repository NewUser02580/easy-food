import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs"

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    let userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log("addFood error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("listFood error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const removeFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => {});
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
    console.log("editFood called, userId:", req.userId, "body:", req.body);
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
      await foodModel.findByIdAndUpdate(req.body.id, updatedData);
      res.json({ success: true, message: "Food Updated" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log("editFood error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood, editFood };