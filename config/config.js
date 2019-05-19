import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.TESTDBNAME,
    host: process.env.DBHOST,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: 'mysql',
    logging: false
  }
};