import Payment from "../models/Payment.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const processPayment = async (req, res, next) => {
  try {
    const { reservationId, cardNumber, expMonth, expYear, cvc } = req.body;

    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }

    const paymentAmount = reservation.price;

    const user = await User.findByPk(req.user.id);
    const customerId = user.stripeCustomerId;


    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount * 100,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethod.id, 
      confirm: true,
      metadata: {
        reservationId: reservationId.toString(),
        userId: req.user.id.toString(),
      },
    });

    const retrievedPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntent.id);

    const payment = await Payment.create({
      reservationId,
      amount: paymentAmount,
      updatedAt: new Date(),
      createdAt: new Date(),
      paymentIntentId: retrievedPaymentIntent.id, 
    });


    const paymentDetails = await stripe.paymentIntents.retrieve(retrievedPaymentIntent.id);

    return res.status(201).json({ success: true, payment, paymentIntent: paymentDetails });
  } catch (error) {
    return next(error);
  }
};

export const createCustomer = async (name, email) => {
  const customer = await stripe.customers.create({
    name,
    email,
  });

  return customer.id;
};
