import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection.js';

class User extends Model {
  // User model definition
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'User', // Set the model name
    timestamps: true,
    // Other options if needed
  }
);

export default User;


// import mongoose from "mongoose";
// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     // country: {
//     //   type: String,
//     //   required: true,
//     // },
//     // img: {
//     //   type: String,
//     // },
//     // city: {
//     //   type: String,
//     //   required: true,
//     // },
//     // phone: {
//     //   type: String,
//     //   required: true,
//     // },
//     password: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", UserSchema);

