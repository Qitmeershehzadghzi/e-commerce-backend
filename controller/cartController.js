import UserModel from "../models/userModel.js";

// ADD product to user cart
// Backend - controller/cartController.js
export const getUserCart = async (req, res) => {
  try {
    // ✅ FIX: Use req.userId instead of req.body.userId
    const userId = req.userId; // This comes from auth middleware
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Also update other cart functions similarly:
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body; // Remove userId from here
    const userId = req.userId; // Get from auth middleware
    
    const userData = await UserModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body; // Remove userId from here
    const userId = req.userId; // Get from auth middleware
    
    const userData = await UserModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Updated cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
