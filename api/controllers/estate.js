import Estate from "../models/Estate.js";
import User from "../models/User.js";

export const createEstate = async (req, res, next) => {
  const newEstate = new Estate(req.body);

  try {
    const agentId = req.user.id;

    // Find the user in the Sequelize database
    const user = await User.findOne({ where: { id: agentId } });

    if (!user) {
      // Handle case when user is not found in the Sequelize database
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Assign the user's id to the createdBy field of the Estate document
    newEstate.createdBy = user.id;

    const savedEstate = await newEstate.save();
    res.status(200).json(savedEstate);
  } catch (err) {
    next(err);
  }
};
export const updateEstate = async (req, res, next) => {
  try {
    const updatedEstate = await Estate.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEstate);
  } catch (err) {
    next(err);
  }
};
export const deleteEstate = async (req, res, next) => {
  try {
    await Estate.findByIdAndDelete(req.params.id);
    res.status(200).json("Estate has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getEstate = async (req, res, next) => {
  try {
    const estate = await Estate.findById(req.params.id)
    .populate("createdBy", "name email")
    .exec();

    if (!estate) {
      return next(createError(404, "Estate not found!"));
    }
    
    res.status(200).json(estate);
  } catch (err) {
    next(err);
  }
};
export const getEstates = async (req, res, next) => {
  try {
    const { search, city, price, type } = req.query;
    const filters = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filters.$or = [{ name: searchRegex }, { city: searchRegex }];
    }

    if (city) {
      filters.city = city;
    }

    if (price) {
      filters.cheapestPrice = { $lte: parseInt(price) };
    }

    if (type) {
      filters.type = type;
    }

    const estates = await Estate.find(filters);
    res.status(200).json(estates);
  } catch (err) {
    next(err);
  }
};
