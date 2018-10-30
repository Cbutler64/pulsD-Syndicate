// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db and other websites
// *********************************************************************************
// Dependencies
// =============================================================
const event = require("../model/Event.js");
const cron = require('node-cron');
const path = require("path");
const axios = require("axios");
// Routes
// =============================================================
module.exports = function (app) {

  // Search for Specific Event (or all Events) then provides JSON
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  // If a user sends data to add a new Event...
  app.post("/api/new", function (req, res) {
    // Take the request...
    let request = req.body;

    //creating new post request
    event.create({
      organization: request.organization,
      eventName: request.eventName,
      description: request.description,
      startTime: request.startTime,
      endTime: request.endTime,
      timeZoneStart: request.timeZone,
      timeZoneEnd: request.timeZone,
      currency: request.currency,
      posted: false
    });
    //syndicateEventBrite(request)
  });

  //task scheduler to check the server every hour
  cron.schedule(' 00 59 * * * *', () => {
    //cron.schedule('* * * * *', () => {  
    console.log('running a task every hour');
    event.findAll({
      where: {
        posted: false
      },
    }).then(function (results) {
      //if there are results than run them in the checkPosted function
      if (results) {
        for (var i = 0; i < results.length; i++) {
          //console.log(results[i].dataValues)
          checkPosted(results[i])
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  });
  //changes the posted value in the table to true and syndicates to the event websites
  function checkPosted(results) {
    var update = {
      posted: true
    }

    event.update(
      update,
      {
        where: {
          id: results.dataValues.id
        }
      }).then(function (event) {
        syndicateEventBrite(results)
        //syndicateXing
      }).catch(function (error) {
        console.log(error);
      });
  }

  // pushes data via a POST request to eventbrite 
  function syndicateEventBrite(results) {
    var eventbriteToken = "B2JP2SFBONFLVFEKA7PD"
    var organizationID;
    axios.get('https://www.eventbriteapi.com/v3/users/me/organizations/?token=' + eventbriteToken, {
    })
      .then(function (response) {

        console.log(response.data.organizations[0].id);
        organizationID = response.data.organizations[0].id;
        postToEventBrite(results, eventbriteToken, organizationID)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function postToEventBrite(post, token, id) {
    console.log(post + token + id)

    axios.post('https://www.eventbriteapi.com/v3/organizations/' + id + '/events/?token=' + token, {
      event: {
        name: {
          html: post.dataValues.eventName
        },
        description: {
          html: post.dataValues.description
        },
        start: {
          timezone: post.dataValues.timeZoneStart,
          utc: post.dataValues.startTime
        },
        end: {
          timezone: post.dataValues.timeZoneEnd,
          utc: post.dataValues.endTime
        },
        currency: post.dataValues.currency
      }

    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // pushes data via a POST request to Xing 
  function syndicateXing(results) {
    axios.get('/user', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.post('https://www.xing-events.com/api/event/create?apikey=NdWEGXJRiVRtXNRKZWOTIVReLghaFue6HyrIO9b6aoIzhN1hNN&version=1&format=json', {
      title: results.dataValues.eventName,
      hostId: results.dataValues.organization,
      Country: "US",
      selectedDate: results.dataValues.startTime,
      SelectedEndDate: results.dataValues.endTime,
      description: results.dataValues.description,
    })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
