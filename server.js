// *********************************************************************************
// Server.js - this file sets up and conects to the frontend
// *********************************************************************************
// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// var db = require("./app/model");

// Static directory to be served
app.use(express.static("app/public"));

// Routes
// =============================================================
require("./app/routes/api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
// db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// }); 
