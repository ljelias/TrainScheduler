
  //My web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCkw-0bhvwcf1h-BdEVopndb7GVAX4eYco",
    authDomain: "train-scheduler-9502f.firebaseapp.com",
    databaseURL: "https://train-scheduler-9502f.firebaseio.com",
    projectId: "train-scheduler-9502f",
    storageBucket: "train-scheduler-9502f.appspot.com",
    messagingSenderId: "719280534359",
    appId: "1:719280534359:web:e0dea3bd971f7196"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "--";
  var destination = "--";
  var firstTrain = "--";
  var frequency = 0;
  var nextArrival = "--";
  var minutesAway = 0;

//to display the current date and time in the header
var currentDayTime = moment();
    console.log(moment(currentDayTime).format("HH:mm"));
    console.log(moment(currentDayTime).format("dddd, MMMM Do, YYYY"));

    $("#current-time").html(moment(currentDayTime).format("dddd, MMMM Do, YYYY ~ HH:mm"));


//  when "submit" button is clicked
$("#submit").on("click", function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get values submitted in form
    trainName = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    firstTrain = "#time-hr" + ":" + "#time-min";
    frequency = Number.parseInt($("#train-frequency").val().trim());

    // Setting values in the database
    database.ref().set({  
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });
});

//MISSING: child added and PUSH??????????????????

// When changes occur Firebase will print them to console and html
database.ref().on("value", function(snapshot) {  //WHAT IS "VALUE"????????????????????

    // Print the initial data to the console.
    console.log(snapshot.val());
  
    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
  
//to calculate times:
var currentTime = moment();
    
// Difference between the times
var minutesElapsed = moment(currentTime).diff(firstTrain, "minutes");
var minutesRemainder = minutesElapsed % frequency;
minutesAway = frequency - minutesRemainder;
nextArrival = moment().add(minutesAway, "minutes");


    // Change the HTML -- create table row
    $("#table").append(
        "<tr><td>" + trainName + 
        "</td><td>" + destination + 
        "</td><td>" + frequency + 
        "</td><td>" + nextArrival + 
        "</td><td>" + MinutesAway + 
        "</td></tr>");

// If any errors are experienced, log them to console.
}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
});
  



//Future: on-click of "refresh-update" button call function postSchedule





