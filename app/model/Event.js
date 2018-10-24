// *********************************************************************************
// Event.js - this file sets up the sequelize model and syncs to the database
// *********************************************************************************
// Dependencies
// =============================================================

// the standard library
const Sequelize = require("sequelize");
//  our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates an event model
var event = sequelize.define("event", {
  organization: Sequelize.STRING,
  eventName: Sequelize.STRING,
  description: Sequelize.STRING,
  startTime: Sequelize.STRING,
  endTime: Sequelize.STRING,
  timeZoneStart: Sequelize.STRING,
  timeZoneEnd: Sequelize.STRING,
  currency: Sequelize.STRING,
  posted: Sequelize.BOOLEAN
}, {
  timestamps: false
});

// Syncs with DB
event.sync();

module.exports = event;
