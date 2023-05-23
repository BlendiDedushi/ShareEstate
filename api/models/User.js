import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class User extends Model {}

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
  },
  {
    sequelize, 
    modelName: 'User', 
    tableName: 'Users',
    timestamps: true,
  }
);

export default User;