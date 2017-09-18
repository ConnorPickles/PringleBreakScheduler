/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentMain = "home"; // current main page
var currentNewInfo = "newLeader"; // current newInfo page

function init() {

}

// makes the displayed screen newScreen
function changeScreen(page, newScreen) {
    var currentScreen = "";
    switch (page) {
        case "main":
            currentScreen = currentMain;
            currentMain = newScreen;
            break;
        case "newInfo":
            currentScreen = currentNewInfo;
            currentNewInfo = newScreen;
            break;
    } // switch
    document.getElementById(currentScreen).className = "hidden";
    document.getElementById(newScreen).className = "visible";
} // changeScreen

// switches the visibility of the given element
function changeVisibility(element) {
  var name = document.getElementById(element).className;

  if (name == "hidden") {
    document.getElementById(element).className = "visible";
  } else {
    document.getElementById(element).className = "hidden";
  } // else
} // changeVisibility
