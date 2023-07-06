import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";


class Reservation extends Model {
  setEstateDetails(estate) {
    const estateDetails = JSON.stringify(estate);
    this.reservationDetails = estateDetails;
  }

  getEstateDetails() {
    try {
      return JSON.parse(this.reservationDetails);
    } catch (error) {
      return null;
    }
  }
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservationDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('Cash', 'By Credit Card', 'PayPal'),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
    timestamps: true,
    tableName: 'Reservations',
  }
);

export default Reservation;