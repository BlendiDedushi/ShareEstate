import Reservation from "../models/Reservation.js";
import Estate from "../models/Estate.js";

// POST /api/reservations
export const createReservation = async (req, res, next) => {
  try {
    const { startDate, endDate, estateId, paymentMethod } = req.body;

    // Retrieve the user from the decoded token
    const userId = req.user.id;

    // Retrieve the estate details from MongoDB
    const estate = await Estate.findById(estateId);

    if (!estate) {
      return res.status(404).json({ success: false, message: "Estate not found" });
    }

    // Extract the necessary details from the estate object
    const estateDetails = {
      name: estate.name,
      type: estate.type,
      city: estate.city,
      address: estate.address,
      // Add more properties as needed
    };

    // Create the reservation in MSSQL
    const reservation = await Reservation.create({
      startDate,
      endDate,
      userId,
      paymentMethod,
      reservationDetails: JSON.stringify(estateDetails),
    });

    return res.status(201).json({ success: true, reservation });
  } catch (error) {
    return next(error);
  }
};