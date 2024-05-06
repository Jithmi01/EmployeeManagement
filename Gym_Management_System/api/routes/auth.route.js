import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, address, phone, desc } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
      throw new Error('All fields are required');
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      desc
    });

    await newUser.save();
    res.json({ success: true, message: 'Signup success' });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
      throw new Error('All fields are required');
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new Error('User not found');
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: validUser._id, ismanger: validUser.ismanger }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ success: true, ...rest, token });
  } catch (error) {
    next(error);
  }
});

export default router;
