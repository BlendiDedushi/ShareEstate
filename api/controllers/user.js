import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const [updatedRows] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return next(createError(404, "User not found!"));
    }
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json(updatedUser);
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
    const user = await User.findByPk(req.params.id);
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
