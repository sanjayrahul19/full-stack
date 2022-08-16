const jwt = require("jsonwebtoken");

const getData = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      req.userId = data.id;
      req.role = data.roles;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Access Denied" });
  }
};

module.exports = getData;
