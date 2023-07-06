import Contact from '../models/Contact.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

export const contactForm = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

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
      from: email,
      to: admin.email,
      subject: subject,
      text: `${message}\n\nFrom: ${name}\nPhone Number: ${phone}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    next(error);
  }
};
