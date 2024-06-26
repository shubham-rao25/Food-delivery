import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {};

//creation of the token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking if user already exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please! Enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please! Enter Strong password",
      });
    }

    //hashing the user password(encrypting the password)
    //we can set the genSalt value from 5-15
    //as Hight the number goes the password is encrypted that strong
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: fals, message: "Error" });
  }
};

export { loginUser, registerUser };
