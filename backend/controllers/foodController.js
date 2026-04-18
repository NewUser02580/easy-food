import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `/uploads/${req.file.filename}`;
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
        fs.unlink(`uploads/${food.image}`, () => {});
        updatedData.image = `/uploads/${req.file.filename}`;
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