// *********************************************************************************
// Connection.js - this file sets up and conects to the SQL server via sequelize
// *********************************************************************************
// Dependencies
// =============================================================
const Sequelize = require("sequelize");

//Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
const sequelize = new Sequelize("pulsD", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// const sequelize = new Sequelize("wopdm7wd17u7fqvx", "pclaf6egfm1t8zfx", "c80weyinuc8j5zek", {
//   host: "tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

module.exports = sequelize;
