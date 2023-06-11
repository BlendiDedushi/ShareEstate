import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { createCustomer } from "./payment.js";
import RoommatePreferences from "../models/RoommatePreferences.js";
import { invalidatedTokens } from "../utils/verifyToken.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Op } from "sequelize";

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

    if (req.body.address) {
      const coordinates = await newUser.getCoordinatesFromAddress(req.body.address);
      newUser.address = req.body.address;
      newUser.latitude = coordinates.latitude;
      newUser.longitude = coordinates.longitude;
    }

    await newUser.save();

    res.status(200).send("User has been created");
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username , email : req.body.email} });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user.id, username: user.username ,role: user.role , email: user.email},
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

export const logout = (req, res) => {
  try {
    const token = req.cookies.access_token;
    
    invalidatedTokens.push(token);

    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const googleUser = req.user;

    let user = await User.findOne({ where: { email: googleUser.emails[0].value } });

    if (!user) {
      user = await User.create({
        username: googleUser.displayName,
        email: googleUser.emails[0].value,
        password:'',
        googleId: googleUser.id,
      });
    } else if (!user.googleId) {
      // Update the user's googleId if it's not set
      user.googleId = googleUser.id;
      await user.save();
    }

    const token = jwt.sign(
      { id: user.id, username: user.username ,role: user.role , email: user.email},
      process.env.JWT,
      { expiresIn: "1h" }
    );

    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");

    // Store the token in the user's document
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    const resetPasswordLink = `http://localhost:8900/api/auth/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Hi ${user.username},\n\nYou have requested to reset your password. Please click on the following link to reset your password:\n\n${resetPasswordLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Failed to send password reset email!" });
      }
      console.log("Password reset email sent:", info.response);
      res.status(200).json({ success: true, message: "Password reset link has been sent to your email!" });
    });
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token!" });
    }

    user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password has been reset successfully!" });
  } catch (error) {
    next(error);
  }
};