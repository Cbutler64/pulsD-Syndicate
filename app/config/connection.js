// *********************************************************************************
// Connection.js - this file sets up and conects to the SQL server via sequelize
// *********************************************************************************
// Dependencies
// =============================================================
const Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
const sequelize = new Sequelize("pulsD", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
