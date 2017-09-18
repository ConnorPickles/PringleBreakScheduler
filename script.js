/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentScreen = "home";

function init() {

}

// makes the displayed screen newScreen
function changeScreen(newScreen) {
    document.getElementById(currentScreen).className = "hidden";
    document.getElementById(newScreen).className = "visible";
    currentScreen = newScreen;
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
