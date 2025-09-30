import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import productModel from '../models/productModel.js'
import Stripe from "stripe";   // ✅ Stripe import karo

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Default currency aur delivery fee define kar do
const currency = "pkr";
const delivery_fee = 200;

// placing order using cod method
export const placeOreder = async (req, res) => {
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
export const placeOrederStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, origin } = req.body; // ✅ origin from body
    console.log("Frontend Origin:", origin);

    const enrichedItems = [];
    for (let item of items) {
      const product = await productModel.findById(item.productId);
      enrichedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        name: product?.name || "Unknown Product",
        images: product?.images?.length ? product.images : [],
        price: product?.price || 0,
      });
    }

    const orderData = {
      userId,
      items: enrichedItems,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      status: "order placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_item = enrichedItems.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery charges" },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_item,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url }); // ✅ keep session_url
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === true || success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });
      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};



// placing order using Razorpay method



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
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
}


// update order status from admin panel
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status updated' })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })


  }
}