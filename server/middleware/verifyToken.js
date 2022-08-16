const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      const user = await User.findById({ _id: data.id });
      if (user.verified) {
        return res.json({ msg: "User has been already Verified" });
      } else {
        req.userId = user.id;
        next();
      }
    } else {
      return res.json({ msg: "Access Denied" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
