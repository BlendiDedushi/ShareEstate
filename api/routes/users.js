// import express from "express";
// import {
//   updateUser,
//   deleteUser,
//   getUser,
//   getUsers,
// } from "../controllers/user.js";
// import { verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";

// const router = express.Router();

// // router.get("/checkauthentication", verifyToken, (req,res,next)=>{
// //   res.send("hello user, you are logged in")
// // })

// // router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
// //   res.send("hello user, you are logged in and you can delete your account")
// // })

// // router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
// //   res.send("hello admin, you are logged in and you can delete all accounts")
// // })

// //update
// router.put("/:id", verifyUser, updateUser);

// //delete
// router.delete("/:id",verifyUser,deleteUser);
// router.delete("/:id", deleteUser);

// //get by id
// router.get("/:id", getUser);

// //Get
// router.get("/", verifyUser,getUsers);

// export default router;

import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Get all users
router.get("/", verifyToken, getUsers);

// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

// Get user by id
router.get("/:id", verifyToken,getUser);


export default router;
