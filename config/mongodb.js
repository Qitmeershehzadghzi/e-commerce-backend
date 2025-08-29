import mongoose from 'mongoose';

const conDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/E-commerce`);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // process band kar do agar DB connect na ho
  }
};

export default conDb;
