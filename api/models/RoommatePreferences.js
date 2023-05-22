import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import User from './User.js';


class RoommatePreferences extends Model {}

RoommatePreferences.init(
  {
    minAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    smoking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    ageWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    genderWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    smokingWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:true,
    }
  },
  {
    sequelize,
    modelName: 'RoommatePreferences',
    tableName: 'RoommatePreferences',
  }
);

// Define the associations
User.hasOne(RoommatePreferences, { foreignKey: 'userId' });
RoommatePreferences.belongsTo(User, { foreignKey: 'userId' });

export default RoommatePreferences;