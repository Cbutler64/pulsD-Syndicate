// *********************************************************************************
// app.js - takes the form inputs then sends it to the server to save in the DB.
// *********************************************************************************

// when user clicks add-btn
$("#add-btn").on("click", function (event) {
  event.preventDefault();
  //get times and convert to proper dateTime
  let startDate = $("#start-date-year").val().trim()
    + "-"
    + $("#start-date-month").val().trim()
    + "-"
    + $("#start-date-day").val().trim()
    + "T"

  let startTime = $("#start-hour").val().trim() + ":00"
  

  let endDate = $("#end-date-year").val().trim()
    + "-"
    + $("#end-date-month").val().trim()
    + "-"
    + $("#end-date-day").val().trim()
    + "T"

  let endTime = $("#end-hour").val().trim() + ":00"
//create times
  let startDatetime = startDate + startTime;
  let endDatetime = endDate + endTime;

  // make a new obj
  const newEvent = {
    organization: $("#organization").val().trim(),
    eventName: $("#event-name").val().trim(),
    description: $("#description").val().trim(),
    startTime: startDatetime,
    endTime: endDatetime,
    timeZone: $("#timezone").val(),
    currency: "USD",
  };
  console.log(newEvent)

  // send an AJAX POST-request with jQuery
  $.post("/api/new", newEvent)
    // on success, run this callback
    .then(function (data) {
      console.log(data);
    });

});
