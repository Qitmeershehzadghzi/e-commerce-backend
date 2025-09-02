import { promises } from "dns";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    console.log("🖼 Files:", req.files);
    console.log("📦 Body:", req.body);

    const image1 = req.files?.image1?.[0] 
    const image2 = req.files?.image2?.[0] 
    const image3 = req.files?.image3?.[0] 
    const image4 = req.files?.image4?.[0] 
    const images =[
      image1,image2,image3,image4
    ].filter((item)=>item !==undefined)
let imagesUrl = await promises.all(
  images.map(async(item)=>{
let result = await cloudinary.uploader.upload(
  item.path,{
    resource_type:'image'
  }
)
return result.secure_url
  })
)
    console.log("📸 Uploaded Files:", image1, image2, image3, image4);

    res.json({});
  } catch (error) {
    console.log("❌ addProduct Error:", error);
    res.json({ success: false, message: error.message });
  }
};



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