// import { promises } from "dns";
import { uploadImageToCloudinary } from "../helpers/upload.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
// import{name,description}from '../models/productModel.js'

// ➕ Add Product
// ...existing code...
export const addProduct = async (req, res) => {
  try {
    console.log("🖼 Files:", req.files); // req.files is now an array
    console.log("📦 Body:", req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    let imagesUrl = [];
    for (let img of req.files) {
      const result = await uploadImageToCloudinary(img);
      if (result.status) {
        imagesUrl.push(result.url);
      }
    }

    console.log("📸 Uploaded URLs:", imagesUrl);

    res.json({ success: true, imagesUrl });
  } catch (error) {
    console.log("❌ addProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};
// ...existing code...



// 📃 List Products
export const listProduct = async (req, res) => {
  try {
  
  } catch (error) {
  }
};

// ❌ Remove Product
export const removeProduct = async (req, res) => {
  try {
 
  } catch (error) {
  }
};

// 🔍 Single Product
export const singleProduct = async (req, res) => {
  try {
   
  } catch (error) {
  }
};