var date = {};

var currentDate=now().format("DD-MM-YYYY");
alert(currentDate);
document.getElementById("currentDay").innerHTML=currentDate;

var currentDay = moment().format("DD-MM-YYYY") {
    var date = moment().toDate();// get JS Date object from moment object
    moment(testDate).format('MM/DD/YYYY');
};


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
};


