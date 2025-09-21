import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import productModel from '../models/productModel.js'


// placing order using cod method
 export const placeOreder =async (req,res)=>{
    try {
    const { userId, items, amount, address } = req.body;

    // Har product ka detail nikalna (name, image, price)
    const enrichedItems = [];
    for (let item of items) {
      const product = await productModel.findById(item.productId);
      enrichedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        name: product?.name || "Unknown Product",
        images: product?.images?.length ? product.images : [], // Cloudinary ka url ayega
        price: product?.price || 0,
      });
    }

    // Order data ready
    const orderData = {
      userId,
      items: enrichedItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "order placed",
      date: Date.now(),
    };

    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // User cart clear kar do
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "✅ Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
// placing order using Stripe  method
export const placeOrederStripe =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
// placing order using Razorpay method
export const placeOrederRazorpay =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


//  All orders data from admin panel
// controller for /order/list
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}); // await zaroor likhna
    res.json({
      success: true,
      data: orders,   // yeh plain JSON-safe array hota hai
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


//  user order data from frontend
export const userOrders =async (req,res)=>{
    try {
        const {userId} =req.body
        const orders =await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        
                   res.json({success:true,message:error.message})
    }
}


// update order status from admin panel
export const updateStatus =async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}