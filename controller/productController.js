// import { promises } from "dns";
import { json } from "express";
import { uploadImageToCloudinary } from "../helpers/upload.js";
import productModel from "../models/productModel.js";
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

    // ✅ req.body se fields nikal lo
    const { name, description, price, category, Subcategory, bestseller, sizes,images } = req.body;

    let imagesUrl = [];
    for (let img of req.files) {
      const result = await uploadImageToCloudinary(img);
      if (result.status) {
        imagesUrl.push(result.url);
      }
    }

    const productDta = {
      name,
      description,
      price: Number(price),
      category,
      Subcategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes),  // ✅ JSON.parse sahi likha
      images: imagesUrl,
      date: Date.now()
    };

    console.log(productDta);

    const pd = productModel(productDta);
    await pd.save();

    res.json({ success: true, message: 'product added' });
  } catch (error) {
    console.log("❌ addProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ...existing code...
// 📃 List Products
export const listProduct = async (req, res) => {
  try {
    const productss = await productModel.find({}); // ✅ await add kiya
    res.json({ success: true, productss });
  } catch (error) {
    console.log("❌ listProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ❌ Remove Product
// ❌ Remove Product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;  // ✅ yaha se id lo
    const rpd = await productModel.findByIdAndDelete(id);

    if (!rpd) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("❌ removeProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};


// 🔍 Single Product
export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ yahan se id lo
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log("❌ singleProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};

