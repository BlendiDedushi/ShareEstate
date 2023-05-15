import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import Estate from "../models/Estate.js";

export const createRoom = async (req,res,next) =>{

    const estateId = req.params.estateid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save()
        try{
            await Estate.findByIdAndUpdate(estateId, {
                $push : {rooms: savedRoom._id},
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
  };
  export const deleteRoom = async (req, res, next) => {
    const estateId = req.params.estateid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try{
        await Estate.findByIdAndUpdate(estateId, {
            $pull : {rooms: req.params.id},
        })
    }catch(err){
        next(err)
    }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };
  export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };