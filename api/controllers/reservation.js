import Reservation from "../models/Reservation.js";
import Estate from "../models/Estate.js";

export const createReservation = async (req, res, next) => {
  try {
    const { startDate, endDate, estateId, paymentMethod } = req.body;


    const userId = req.user.id;


    const estate = await Estate.findById(estateId);

    if (!estate) {
      return res.status(404).json({ success: false, message: "Estate not found" });
    }

    const estateDetails = {
      name: estate.name,
      type: estate.type,
      city: estate.city,
      address: estate.address,
    };

    const reservation = await Reservation.create({
      startDate,
      endDate,
      userId,
      paymentMethod,
      reservationDetails: JSON.stringify(estateDetails),
      price: estate.cheapestPrice, 
    });

    return res.status(201).json({ success: true, reservation });
  } catch (error) {
    return next(error);
  }
};
