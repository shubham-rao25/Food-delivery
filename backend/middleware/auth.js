import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  //we are getting the token from the header

  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized! Login Again" });
  }
  try {
    //we can use the token to get the userID
    //this will require the token and jwt secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    //setting the _id from token to req.body.userId
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
