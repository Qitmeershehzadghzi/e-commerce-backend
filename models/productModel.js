import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  Subcategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, default: Date.now },
});

// ✅ Model naming fix → singular, capitalized, without duplicate definitions
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;