import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import fetch from 'node-fetch';

class User extends Model {
  async getCoordinatesFromAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        throw new Error('No coordinates found for the given address');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
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
    role: {
      type: DataTypes.ENUM('admin', 'user', 'agent'),
      defaultValue: 'user',
      allowNull: false,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId :{
      type : DataTypes.STRING,
      allowNull:true
    }
  },
  {
    sequelize, 
    modelName: 'User', 
    tableName: 'Users',
    timestamps: true,
  }
);

export default User;