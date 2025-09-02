import express from "express";
import { addProduct, removeProduct, listProduct, singleProduct } from "../controller/productController.js";
import upload from "../middleware/multer.js";
import multer from "multer";
const router = express.Router();

// ✅ single field name "images"

router.post(
  "/add",
  upload.array("  ", 12), // ek hi field "photos" me max 12 images
  addProduct
);



router.delete("/remove/:id", removeProduct);
router.get("/single/:id", singleProduct);
router.get("/list", listProduct);

export default router;
