import Estate from "../models/Estate.js";
import User from "../models/User.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import multer from 'multer';
import path from "path";

const __filename = fileURLToPath(import.meta.url);


const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});


const upload = multer({ storage });

export const uploadPhotos = upload.array("photos", 5); 

export const createEstate = async (req, res, next) => {
  uploadPhotos(req, res, async (err) => {
   if (err instanceof multer.MulterError) {
     return res.status(400).json({ success: false, message: err.message });
   } else if (err) {
     return res.status(500).json({ success: false, message: "Server error" });
   }

   console.log(uploadPhotos);
   const newEstate = new Estate(req.body);

   if (req.files) {
     newEstate.photos = req.files.map((file) => file.filename);
   }

   try {
     const agentId = req.user.id;

     const user = await User.findOne({ where: { id: agentId } });

     if (!user) {
       return res.status(404).json({ success: false, message: "User not found." });
     }

     newEstate.createdBy = user.id;

     const savedEstate = await newEstate.save();
     res.status(200).json(savedEstate);
   } catch (err) {
     next(err);
   }
 });
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
