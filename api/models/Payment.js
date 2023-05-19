import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    reservationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentIntentId: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    timestamps: true,
    tableName: "Payments",
  }
);

export default Payment;