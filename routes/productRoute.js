import express from "express";
import { addProduct, removeProduct, listProduct, singleProduct } from "../controller/productController.js";
import { upload } from "../helpers/upload.js";
import multer from "multer";
import adminauth from "../middleware/AdminAuth.js";
const router = express.Router();

// ✅ single field name "images"

router.post(
  "/add",
  adminauth
  ,
  (req, res, next) => {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          status: false,
          message: `Upload error: ${err.message}`
        });
      } else if (err) {
        return res.status(500).json({
          status: false,
          message: `Unknown error: ${err.message}`
        });
      }
      addProduct(req, res);
    });
  }
);



router.delete("/remove/:id",adminauth, removeProduct);
router.get("/single/:id", singleProduct);
router.get("/list", listProduct);

export default router;
