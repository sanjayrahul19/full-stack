const router = require("express").Router();
const User = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const {
  verifyToken,
  getData,
  permit,
  password,
} = require("../middleware/index");
router.post("/signUp", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    const preUser = await User.findOne({ email: req.body.email });
    if (preUser) {
      return res.json({ msg: "User already Exists" });
    } else {
      const user = new User(req.body);
      await user.save();
      console.log(user);
      const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: "sanjaytest1999@gmail.com",
          pass: "ytcgqafyjviximny",
        },
      });

      const info = transporter.sendMail({
        from: "sanjaytest1999@gmail.com",
        to: req.body.email,
        subject: "Verify Your Email - Rahul Team",
        html: `
        <div>
    <p><span style="font-weight:bold;font-size:1.6rem">${req.body.name}</span>,We Welcome to our platform.</p>
<a style="background-color:#2980B9;color:white" href="http://localhost:3000/verify/${token}">Verify Email</a>
<div style="background-color:#6DD5FA">
<p>Thank and Regards</p>
<p>From Mini Team</p>
    </div>
    </div>
        `,
      });
      if (info) {
        console.log(info);
      }
      return res.json(token);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/verify", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { verified: true },
      { new: true }
    );
    return res.json({ msg: "Account Verified" });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
          const token = await jwt.sign(
            { id: user._id, roles: user.role },
            process.env.SECRET_KEY
          );
          return res.json({ token, msg: "Login Successfull" });
        } else {
          return res.json("Incorrect password");
        }
      } else {
        return res.json({ msg: "User not Verified" });
      }
    } else {
      return res.json({ msg: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/data", getData, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.find({ _id: userId }).select(
      "-createdAt -updatedAt -v -password"
    );
    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Access Denied" });
  }
});

router.get("/usersdata", [getData, permit(["admin"])], async (req, res) => {
  try {
    const user = await User.find({}).select(
      "-createdAt -updatedAt -password -__v"
    );

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, msg: error });
  }
});

router.post("/password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });
        const transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: "sanjaytest1999@gmail.com",
            pass: "ytcgqafyjviximny",
          },
        });
        const info = await transporter.sendMail({
          from: "sanjaytest1999@gmail.com",
          to: req.body.email,
          subject: "Reset Password",
          html: `
          <div> 
          <p  style="color: black;  font-variant: small-caps; font-family: sans-serif; font-size:22px"> Hello <b>${user.name}</b> your password change request is successfully initiated.</p>
          <div> 
          <button style="padding:10px; outline:none;">
          <a style="color: black; text-decoration: none;" href="http://localhost:3000/reset-password/${token}">Click here to reset-password</a>
          </button>
          <p style="color: black; font-family: sans-serif; font-size:15px">This link will expire in 2 minutes</p>
          <p style="color: black; font-family: sans-serif; font-size:15px">For Mini Team </p>
         </div>
         </div>
          `,
        });
        if (info) {
          console.log(info);
        }
        res.json({ msg: "Email sent" });
      } else {
        return res.json({ msg: "User not verified" });
      }
    } else {
      return res.json({ msg: "No user found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password", password, async (req, res) => {
  try {
    const userId = req.userId;
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hash },
      { new: true }
    );
    return res.json({
      msg: "Password has been changed successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
