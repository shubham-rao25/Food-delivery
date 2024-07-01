import { name } from "ejs";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//getting the support of the stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    //on place order we need to update the user cart to empty.
    //this is a logic to make the cart empty in the dataBase
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    //line item is neccessary for the stripe payment to happen
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "aud",
        price_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {}
};

export { placeOrder };
