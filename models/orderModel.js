import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String },
      images: { type: [String] },
      price: { type: Number },
      quantity: { type: Number, required: true },
      size: { type: String },
    }
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "order placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

// ⚠️ Model name galat tha `oders` → `orders`
const orderModel = mongoose.model('orders', orderSchema)

export default orderModel
