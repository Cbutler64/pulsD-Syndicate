// *********************************************************************************
// app.js - takes the form inputs then sends it to the server to save in the DB.
// *********************************************************************************
$("#start-date").datepicker();
$("#end-date").datepicker();
//console.log()
// when user clicks add-btn
$("#add-btn").on("click", function (event) {
  //event.preventDefault();

  
  var startDateInput = $("#start-date").val().trim()
  var startDateArr = startDateInput.split("/")
  //get times and convert to proper dateTime
  let startDate = startDateArr[2]
    + "-"
    + startDateArr[0]
    + "-"
    + startDateArr[1]
    + "T"
//console.log(startDate)
  let startTime = $("#start-hour").val().trim() + ":00Z"

  var endDateInput = $("#end-date").val().trim()
  var endDateArr = endDateInput.split("/")

  let endDate = endDateArr[2]
    + "-"
    + endDateArr[0]
    + "-"
    + endDateArr[1]
    + "T"
//console.log(endDate)
  let endTime = $("#end-hour").val().trim() + ":00Z"
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
