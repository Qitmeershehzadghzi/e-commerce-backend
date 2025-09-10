import UserModel from "../models/userModel.js";

// ADD product to user cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
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

// UPDATE product quantity in cart
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
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

// GET user cart
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId);

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData }); // ✅ FIX: proper field return
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
