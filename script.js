
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


//to display the current date and time in the header
var currentDayTime = moment();
    //console.log(moment(currentDayTime).format("HH:mm"));
    //console.log(moment(currentDayTime).format("dddd, MMMM Do, YYYY"));
$("#current-time").html(moment(currentDayTime).format("dddd, MMMM Do, YYYY ~ HH:mm"));


//  when "submit" button is clicked 
$("#submit").on("click", function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get values submitted in form
    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTrain = $("#time-hr").val().trim() + ":" + $("#time-min").val().trim();
    var frequency = Number.parseInt($("#train-frequency").val().trim());

    var newTrain = {  
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      }
    // Setting values in the database
    database.ref().push(newTrain);

      console.log(firstTrain);
      

// When changes occur Firebase will print them to console and html
database.ref().on("child_added", function(childSnapshot) { 

    // Print the initial data to the console.
    // console.log(childSnapshot.val());

     // Log the value of the various properties
    //console.log(childSnapshot.val().trainName);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().firstTrain);
   // console.log(childSnapshot.val().frequency);

var postedName = childSnapshot.val().trainName;
var postedDestination = childSnapshot.val().destination;
var postedFrequency = childSnapshot.val().frequency;
var fTrain = childSnapshot.val().firstTrain;


//to calculate times:
var currentTime = moment();
    console.log(moment().format("HH:mm"));
var firstTime = moment(fTrain, "HH:mm");
    console.log(moment(firstTime).format("HH:mm"));
// Difference between the times
var minutesElapsed = moment().diff(firstTime, "minutes");
    console.log(minutesElapsed);
var minutesRemainder = minutesElapsed % postedFrequency;
var minutesAway = postedFrequency - minutesRemainder;
    console.log(minutesAway);
var nextArrival = moment(currentTime).add(minutesAway, "minutes");
    console.log(moment(nextArrival).format("HH:mm"));

    // Change the HTML -- create table row
    $("#table").append(
        "<tr><td>" + postedName + 
        "</td><td>" + postedDestination + 
        "</td><td>" + postedFrequency + 
        "</td><td>" + moment(nextArrival).format("HH:mm") + 
        "</td><td>" + minutesAway + 
        "</td></tr>");

// If any errors are experienced, log them to console.
}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
});
  
});


//Future: on-click of "refresh-update" button call function postSchedule





