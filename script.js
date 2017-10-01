/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentMain = "home"; // current main page
var currentNewInfo = "newLeader"; // current newInfo page
var leaders = [];

// called when the page loads
function init() {
    var newLeaderForm = document.getElementById("newLeaderForm");

    newLeaderForm.onsubmit = function () {
        var firstNameField = document.getElementById("newLeaderFirstName");
        var lastNameField = document.getElementById("newLeaderLastName");
        var ropesBox = document.getElementById("newLeaderRopes");
        var NLBox = document.getElementById("newLeaderNL");
        var sailingBox = document.getElementById("newLeaderSailing");
        var staffBox = document.getElementById("newLeaderStaff");
        var volunteerBox = document.getElementById("newVolunteerBox");
        var rolesList = document.getElementById("newLeaderRoles");
        var breaksDuringField = document.getElementById("newLeaderBreaksDuring");
        var breaksNotDuringField = document.getElementById("newLeaderBreaksNotDuring");
        var cabinsList = document.getElementById("newLeaderCabins");
        var atCampBox = document.getElementById("newLeaderAtCamp");

        // check for invalid input

        /*
        var foobar = "input recieved\n";
        foobar += "First name: " + firstNameField.value + "\n";
        foobar += "Last name: " + lastNameField.value + "\n";
        foobar += "ropes: " + ropesBox.checked + "\n";
        foobar += "lifeguard: " + NLBox.checked + "\n";
        foobar += "sailing: " + sailingBox.checked + "\n";
        foobar += "staff: " + staffBox.checked + "\n";
        foobar += "role: " + rolesList.value + "\n";
        foobar += "breaksDuring: " + breaksDuringField.value + "\n";
        foobar += "breaksNotDuring: " + breaksNotDuringField.value + "\n";
        foobar += "cabin: " + cabinsList.value + "\n";
        foobar += "atCamp: " + atCampBox.checked + "\n";
        alert(foobar);
        */

        /*
        alert("input recieved");
        alert("First name: " + firstNameField.value);
        alert("Last name: " + lastNameField.value);
        alert("ropes: " + ropesBox.checked);
        alert("lifeguard: " + NLBox.checked);
        alert("sailing: " + sailingBox.checked);
        alert("staff: " + staffBox.checked);
        alert("role: " + rolesList.value);
        alert("breaksDuring: " + breaksDuringField.value);
        alert("breaksNotDuring: " + breaksNotDuringField.value);
        alert("cabin: " + cabinsList.value);
        alert("atCamp: " + atCampBox.checked);
        */

        var newLeader = {
            firstName:firstNameField.value,
            lastName:lastNameField.value,
            ropes:ropesBox.checked,
            lifeguard:NLBox.checked,
            sailing:sailingBox.checked,
            staff:staffBox.checked,
            role:rolesList.value,
            breaksDuring:breaksDuringField.value,
            breaksNotDuring:breaksNotDuringField.value,
            cabin:cabinsList.value,
            atCamp:atCampBox.checked,
            alertLeader:function() {
                var output = "input recieved\n";
                output += "First name: " + this.firstName + "\n";
                output += "Last name: " + this.lastName + "\n";
                output += "ropes: " + this.ropes + "\n";
                output += "lifeguard: " + this.lifeguard + "\n";
                output += "sailing: " + this.sailing + "\n";
                output += "staff: " + this.staff + "\n";
                output += "role: " + this.role + "\n";
                output += "breaksDuring: " + this.breaksDuring + "\n";
                output += "breaksNotDuring: " + this.breaksNotDuring + "\n";
                output += "cabin: " + this.cabin + "\n";
                output += "atCamp: " + this.atCamp + "\n";
                alert(output);
            } // alertLeader
        }; // newLeader

        newLeader.alertLeader();

        return false;
    }; // newLeaderForm.onsubmit
} // init

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
