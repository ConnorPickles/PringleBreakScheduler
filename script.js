/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentMain = "home"; // current main page
var currentNewInfo = "newLeader"; // current newInfo page
var leaders = []; // array of leaders

function leader(newFirstName, newLastName, newRopes, newLifeguard, newSailing, newStaff, newRole, newBreaksDuring, newBreaksNotDuring, newCabin, newAtCamp) {
    this.firstName = newFirstName;
    this.lastName = newLastName;
    this.ropes = newRopes;
    this.lifeguard = newLifeguard;
    this.sailing = newSailing;
    this.staff = newStaff;
    this.role = newRole;
    this.breaksDuring = newBreaksDuring;
    this.breaksNotDuring = newBreaksNotDuring;
    this.cabin = newCabin;
    this.atCamp = newAtCamp;

    // displays all information for a leader
    this.alertLeader = function () {
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
} // leader

// called when the page loads
function init() {
    var newLeaderForm = document.getElementById("newLeaderForm");

    // handle input for a new leader
    newLeaderForm.onsubmit = function () {
        var firstNameField = document.getElementById("newLeaderFirstName");
        var lastNameField = document.getElementById("newLeaderLastName");
        var ropesBox = document.getElementById("newLeaderRopes");
        var NLBox = document.getElementById("newLeaderNL");
        var sailingBox = document.getElementById("newLeaderSailing");
        var staffBox = document.getElementById("newLeaderStaff");
        var volunteerBox = document.getElementById("newLeaderVolunteer");
        var rolesList = document.getElementById("newLeaderRoles");
        var breaksDuringField = document.getElementById("newLeaderBreaksDuring");
        var breaksNotDuringField = document.getElementById("newLeaderBreaksNotDuring");
        var cabinsList = document.getElementById("newLeaderCabins");
        var atCampBox = document.getElementById("newLeaderAtCamp");

        // check for invalid input
        if (!staffBox.checked && !volunteerBox.checked) {
            alert("Please check the Staff box or the Volunteer box");
            return false;
        } else if (staffBox.checked && volunteerBox.checked) {
            alert("A leader cannot be staff and volunteer! Please uncheck one of the boxes");
            return false;
        } // else if

        // don't let leaders with the same name be added
        if (leaderExists(firstNameField.value, lastNameField.value)) {
            alert("This leader already exists!");
            return false;
        } // if

        var newLeader = new leader(firstNameField.value, lastNameField.value,
            ropesBox.checked, NLBox.checked, sailingBox.checked, staffBox.checked,
            rolesList.value, breaksDuringField.value, breaksNotDuringField.value, cabinsList.value, atCampBox.checked);

        leaders.push(newLeader);
        leaders[leaders.length - 1].alertLeader();
        alertLeaders();

        // TODO: save new leader in the HTML file

        return false;
    }; // newLeaderForm.onsubmit

    // TODO: read in input from HTML file
} // init

function leaderExists(firstName, lastName) {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    var currFirst = "";
    var currLast = "";

    for (var i = 0; i < leaders.length; i++) {
        currFirst = leaders[i].firstName.toLowerCase();
        currLast = leaders[i].lastName.toLowerCase();
        if (firstName == currFirst && lastName == currLast) {
            return true;
        } // if
    } // for i

    return false;
} // leaderExists

function alertLeaders() {
    var output = "List of leaders:\n";

    for (var i = 0; i < leaders.length; i++) {
        output += leaders[i].firstName + " " + leaders[i].lastName;
        output += "\n";
    } // for i

    alert(output)
} // listLeaders

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
