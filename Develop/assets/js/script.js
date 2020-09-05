var date = {};
var timeFormat=12; // controls whether 12 or 24 hour
var startBuis=8; // starting buisness hours
var endBuis=17;  // ending buisness hours

var currentDate= moment().format("dddd MMMM DD, YYYY"); //gets current date
document.getElementById("currentDay").innerHTML=currentDate; //adds date to HTML page

function createTimes(){
  var myClasses="";
  var currentHour=moment().format("HH");
  console.log(currentHour);
  for (i=0;i<=24;i++){ // loops over the 24 hours in a day
    if (timeFormat==12){ // toggles between 12/24 hr format
      var timeAndDate = moment(i,"HH:mm").format("hh:mm A");
    } else {
      var timeAndDate = moment(i,"HH:mm").format("hh:mm a");
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

    var taskLi = $("<li>").addClass("list-group-item"+myClasses);
    var taskSpan = $("<span>").addClass("badge badge-primary badge-pill").text(timeAndDate);

    taskLi.append(taskSpan);
    $("#times").append(taskLi); // adds the hours of a day li to the times div
  }
};
createTimes(timeFormat);





// Not currently used below

var createDate = function(DateText, eventDate, dateList) {
    // create elements that make up a task item
    var dateLi = $("<li>").addClass("list-group-item");
  
    var dateSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(eventDate);
  
    var dateP = $("<p>")
      .addClass("m-1")
      .date(dateText);
  
    // append span and p element to parent li
    dateLi.append(dateSpan, dateP);
  
  
    // append to ul list on the page
    $("#list-" + dateList).append(dateLi);
  };
