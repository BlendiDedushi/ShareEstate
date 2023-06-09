import User from "../models/User.js";
import Estate from "../models/Estate.js";
import nodemailer from "nodemailer";
import upload from "../utils/multer.js";
import { createError } from "../utils/error.js";
import path from "path";

export const updateUser = async (req, res, next) => {
  try {
    upload.single("avatar")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const { file } = req;
      if (file) {
        const fullPath = path.resolve(file.path);
        req.body.avatar = fullPath;
      }

      const [updatedRows] = await User.update(req.body, {
        where: { id: req.params.id },
      });

      if (updatedRows === 0) {
        return next(createError(404, "User not found!"));
      }

      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } });
    if (deletedUser === 0) {
      return next(createError(404, "User not found!"));
    }
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const { address, latitude, longitude } = user;

    res.status(200).json({ address, latitude, longitude });
  } catch (err) {
    next(err);
  }
};

export const sendEmail = async (req, res, next) => {
  const { estateId } = req.params;
  const { message } = req.body;
  const receiverEmail = "blendi.dedushaj1@gmail.com";

  try {
    const estate = await Estate.findById(estateId);
    if (!estate) {
      return res
        .status(404)
        .json({ success: false, message: "Estate not found." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.user.email,
      to: receiverEmail,
      subject: `${estate.name}-${estate.city}`,
      text: `${message}\n\n--------------------------\nFrom: ${req.user.email}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  const { userId } = req.params;
  const { subject, message } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.user.email,
      to: user.email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    next(error);
  }
};
