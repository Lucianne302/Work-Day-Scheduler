var events = {}; // stores events
var timeFormat=12; // controls whether 12 or 24 hour
var startBuis=7; // starting buisness hours
var endBuis=18;  // ending buisness hours

var currentDate= moment().format("dddd MMMM DD, YYYY"); //gets current date
document.getElementById("currentDay").innerHTML=currentDate; //adds date to HTML page


var loadEvents = function() {
  events = JSON.parse(localStorage.getItem("events")); // retrieves events from local storage and saves them into events

  if (!events) { // if nothing is in localStorage, create a new object to track all task status arrays
    events = {
      myEvents: []
    };
  }

  $.each(events, function(list, arr) {   // loop over object items
    arr.forEach(function(event) {     // then loop over sub-array
      var myEvent = "<span class='eTitle'>"+event.eTitle+"</span><br>"; //creates event title span
      myEvent+="<span class='eText'>"+event.eText+"</span>"; //creates event text span
    
      document.getElementById("event"+event.eTime).innerHTML=myEvent; //writes the saved event into HTML
    });
  });
};


function createTimes(){
  var myClasses=""; //stores classes to determine colors for time of day
  var currentHour=moment().format("HH"); // gets current hour in military time
  console.log(currentHour); //test for debugging
  for (i=0;i<=24;i++){ // loops over the 24 hours in a day
    if (timeFormat==12){ // toggles between 12/24 hr format
      var timeAndDate = moment(i,"HH:mm").format("hh:mm A"); //sets hous of day based on i (non-military time)
    } else {
      var timeAndDate = moment(i,"HH:mm").format("HH:MM"); //sets hous of day based on i (military time)
    }

    if (i<startBuis){
      myClasses=" offHours";// before buisness hours
    } else if (i==currentHour){
      myClasses =" present"; // present hour
    } else if (i>=startBuis && i<currentHour){
      myClasses=" past";// during buisness hours
    } else if (i>currentHour && i<=endBuis){
      myClasses=" future";// during buisness hours
    } else {
      myClasses=" offHours";// after buisness hours
    };

    var taskLi = $("<li id='"+i+"'>").addClass("list-group-item"+myClasses);   //hours of the day list item
    var taskSpan = $("<span>").addClass("badge badge-primary badge-pill").text(timeAndDate); //adds time to list item in span
    var taskP = $("<p id='event"+i+"'>").text(''); //place holder for event

    taskLi.append(taskSpan,taskP); //append span and p to list items
    $("#times").append(taskLi); // adds the hours of a day li to the times div
  } //loops until it goes through all 24 hours of the day
};

createTimes(); //calls create times
loadEvents(); //calls load events

var saveEvents = function() {
  localStorage.setItem("events", JSON.stringify(events)); //converts saved event into a string to save in local storage
};

function saveBtn(tmpID){
  console.log(tmpID); //prints out the temp ID for debugging 

  var eventTitle = $("#input"+tmpID).val(); //gets value from the events title input on the HTML page
  var eventText = $("#tArea"+tmpID).val();  //gets value from the events text area on the HTML page
  var myEvent = "<span class='eTitle'>"+eventTitle+"</span><br>"; //appends the spand from the title to the event
  myEvent+="<span class='eText'>"+eventText+"</span>"; //appends the spand from the text into the event

  document.getElementById("event"+tmpID).innerHTML=myEvent; // adds title and text into the HTML page
  
  console.log(events); //prints events for debugging 
  
  var saveFlag=true; // creates save flag and sets to true 
  $.each(events, function(list, arr) { // loops over each object
    arr.forEach(function(event) { // loops over each array
      if (tmpID===event.eTime){ //if selected event time is in the event array, then an item already exists
        saveFlag=false; // item exists, set save flag to false
        event.eTitle=eventTitle; // update event title 
        event.eText=eventText; // update event text
      }
    });
  });
  
  if (saveFlag){ //if saved flag is true, then item does not exist yet
    events.myEvents.push({ //adds new event to end of array
      eTitle: eventTitle, // adds event title
      eText: eventText, // adds event text
      eTime: tmpID  // adds event time 
    });
  }

  saveEvents(); //call for saved events
};

function canBtn(tmpID){ // cancel button action
  document.getElementById("input"+tmpID).remove(); //removes input
  document.getElementById("tArea"+tmpID).remove(); //removes textarea
  document.getElementById("save"+tmpID).remove(); //removes save button
  document.getElementById("can"+tmpID).remove(); //removes cancel button 
};

$(".list-group").on("click","li", function() { // Create a new event on click of an li
  console.log(this.id); //prints current id
  var tempID=this.id; // assigns the id of the li to temp id
  //saves the event title input, place holder, and class to the eventTitle variable
  var eventTitle = $("<input id='input"+tempID+"'>").attr("type", "text").attr("placeholder", "Event Title").addClass("form-control"); 
  //saves the event textarea, place holder and class to the eventInput variable
  var eventInput = $("<textarea id='tArea"+tempID+"'>").attr("placeholder", "Event Description").addClass("form-control"); 
  //saves the saveBtn to the saveBtn variable and assigns the save button function
  var saveBtn=$("<input id='save"+tempID+"' onClick='saveBtn("+tempID+");'>") 
  .attr("type", "button")
  .addClass("form-control saveBtn")
  .val("Save");

  //saves the canBtn to the canBtn variable and assigns the cancel button function
  var canBtn=$("<input id='can"+tempID+"' onClick='canBtn("+tempID+");'>")
  .attr("type", "button")
  .addClass("form-control")
  .val("Cancel");
  /*var deleteBtn=$("<input id='delete"+tempID+"'>")
  .attr("type", "button")
  .addClass("form-control")
  .val("Delete");*/

  var chkVar=document.getElementById("input"+tempID); // get input var if it exists

  if (!chkVar){ //Check to see if form vars is already added
    $("#event"+tempID).append(eventTitle,eventInput,saveBtn,canBtn); //if chkVar does not exist, add form variable to page
  }
});

//$(".list-group-item").on("click","button", function(){
  //console.log('test');
//});
