import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//create
router.post("/", async (req,res)=>{
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch{
        res.status(500).json(err)
    }
})

//update
router.put("/:id", async (req,res)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
             { $set: req.body },
             {new:true})
        res.status(200).json(updatedHotel)
    }catch{
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async (req,res)=>{
    try{
         await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }catch{
        res.status(500).json(err)
    }
})


//get by id
router.get("/:id", async (req,res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch{
        res.status(500).json(err)
    }
})
//Get 
router.get("/", async (req,res,next)=>{
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    }catch(err) {
        next(err)
    }
})

export default router;