import { Sequelize } from 'sequelize';
import { config } from './config.js';

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.server,
    dialect: 'mssql',
  }
);


export default sequelize;