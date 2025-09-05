import UserModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for userLogin

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const User = await UserModel.findOne({ email });  // ❌ new hata diya
        if (!User) {
            return res.json({ success: false, msg: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, User.password);  // ❌ await lagaya
        if (isMatch) {
            const Token = createToken(User._id);
            res.json({ success: true, Token });
        } else {
            res.json({ success: false, msg: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for register 
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkUser = await UserModel.findOne({ email });
        if (checkUser) {
            return res.json({ success: false, msg: "User already exists" });
        }

        // validating email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please enter a valid email" });
        }
        if (password.length < 8) {   // ✅ spelling fix
            return res.json({ success: false, msg: "Please enter a strong password" });
        }

        // ✅ bcrypt async ka sahi use
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // ✅ UserModel.create ka sahi use
        const user = await UserModel.create({
            name,
            email,
            password: hash
        });

        // ✅ token me user._id
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }
};

// Route for admin login 
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // ✅ Object payload instead of string
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
