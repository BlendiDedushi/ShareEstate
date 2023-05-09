import Estate from "../models/Estate.js";


export const createEstate = async (req, res, next) => {
  const newEstate = new Estate(req.body);

  try {
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
    const estate = await Estate.findById(req.params.id);
    res.status(200).json(estate);
  } catch (err) {
    next(err);
  }
};
export const getEstates = async (req, res, next) => {
  try {
    const estates = await Estate.find();
    res.status(200).json(estates);
  } catch (err) {
    next(err);
  }
};
