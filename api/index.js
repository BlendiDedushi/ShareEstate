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
import { googleLogin } from "./controllers/auth.js";
import Estate from "./models/Estate.js";

const app = express();

dotenv.config();
app.use(cors());


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

    // Define the associations between User and Reservation
    User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
    Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    Reservation.hasOne(Payment, { foreignKey: "reservationId", as: "payment" });
    Payment.belongsTo(Reservation, { foreignKey: "reservationId", as: "reservation" });


    // return Reservation.sync(); 
    return sequelize.sync();
  })
  .then(() => {
    console.log('Reservation model synchronized with the database!');
    return connect(); // Connect to MongoDB
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

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL after successful Google authentication
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleLogin
);

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