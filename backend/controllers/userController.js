import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//creation of the token for the user
//sent to the user at the time of login
//jwt.secret is present inside dotenv file
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //if we have a user with the provided email id then it is stored in the variable USER
    //getting detail from the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // we need to compare the provided password with one stored in database
    //this is done using bcrypt inorder to compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
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
    //for validating we will be using validator package
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

    //using bcrypt...
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

    //creation of the token
    const token = createToken(user._id);
    //sending the token to the user..
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: fals, message: "Error" });
  }
};

export { loginUser, registerUser };
