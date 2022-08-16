const jwt = require("jsonwebtoken");

const password = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      req.userId = data.id;
      next();
    } else {
      res.json({ success: false, msg: "Link has expired" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = password;
