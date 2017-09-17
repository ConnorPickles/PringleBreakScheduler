/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/

function foobar() {
    var input = document.getElementById("test2").innerHTML;
    alert(input);
} // foobar

// switches the visibility of the given element
function changeVisibility(element) {
  var name = document.getElementById(element).className;

  if (name == "hidden") {
    document.getElementById(element).className = "visible";
  } else {
    document.getElementById(element).className = "hidden";
  } // else
} // changeVisibility
