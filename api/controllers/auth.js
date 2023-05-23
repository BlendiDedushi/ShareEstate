import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { createCustomer } from "./payment.js";
import RoommatePreferences from "../models/RoommatePreferences.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();

    if (req.body.roommatePreference) {
      const roommatePreference = await RoommatePreferences.create(req.body.roommatePreference);
      roommatePreference.userId = newUser.id;
      await roommatePreference.save();
    }

      const stripeCustomerId = await createCustomer(
      req.body.username,
      req.body.email
    );
    newUser.stripeCustomerId = stripeCustomerId;
    await newUser.save();

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
      { id: user.id, username: user.username ,role: user.role },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token }); 
  } catch (err) {
    next(err);
  }
};

