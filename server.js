import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import conDb from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/CartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
console.log("ENV MONGODB_URL:", process.env.MONGODB_URL);

const app = express();
const port = process.env.PORT || 4000;

conDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads")); // ✅ fixed missing slash

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);


app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.listen(port, () => console.log(`✅ Server started on port: ${port}`));