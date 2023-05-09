import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    // await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user.id, username: user.username ,isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token }); // Include the user and token in the response
  } catch (err) {
    next(err);
  }
};