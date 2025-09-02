import mongoose from "mongoose";

const conDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default conDb;
