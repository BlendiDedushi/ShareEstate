import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import estatesRoute from "./routes/estates.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import sequelize from "./db/connection.js";
import reservationRoute from './routes/reservation.js';
import User from "./models/User.js";
import Reservation from "./models/Reservation.js";
import Payment from "./models/Payment.js";
import rommatefindRoute from "./routes/rommatefind.js";
import cors from "cors";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from "express-session";
import jwt from "jsonwebtoken";
import contactRoute from './routes/contact.js'

const app = express();

dotenv.config();
app.use(cors());

app.use('/uploads', express.static('uploads'));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MSSQL database!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('MSSQL models synchronized with the database!');

    User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
    Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    Reservation.hasOne(Payment, { foreignKey: "reservationId", as: "payment" });
    Payment.belongsTo(Reservation, { foreignKey: "reservationId", as: "reservation" });
 
    return sequelize.sync();
  })
  .then(() => {
    console.log('Reservation model synchronized with the database!');
    return connect(); 
  })
  .then(() => {
    console.log('Database relationships established!');
  })
  .catch((error) => {
    console.error('Unable to connect to the databases:', error);
  });


  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/estates', estatesRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/reservation',reservationRoute);
app.use('/api/roommates',rommatefindRoute);
app.use('/api/contact',contactRoute);

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL after successful Google authentication
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  try {
    // Generate the JWT token
    const user = req.user;
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, email: user.email },
        process.env.JWT,
        { expiresIn: '1h' }
    );

    // Set the cookie on the response
    res.cookie('token', token,);

    // Redirect the user back to the frontend with the token and user data as query parameters
    const redirectURL = `http://localhost:3000?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectURL);
  } catch (err) {
    console.error('Google login callback error:', err);
    res.status(500).json({ message: 'Google login failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8900, () => {
  console.log('Connected to backend!');
});