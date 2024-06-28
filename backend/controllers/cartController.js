import userModel from "../models/userModel.js";

//add items to user Cart

//when user has to save the data in the cart it will send the token
//the token is then decoded and what we get is the userId
//we use the id to find the user and extract his cart details and modify the cart details

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//remove items from the user cart

const removeFromCart = async (req, res) => {};

//fetch user cart data

const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
