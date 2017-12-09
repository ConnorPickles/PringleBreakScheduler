/************************************************************************
* Name:    Pringle Break Scheduler
* Author: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentMain = "home"; // current main page
var currentNewInfo = "newLeader"; // current newInfo page
var currentEditInfo = "editLeader"; // current editInfo page
var currentEditLeader = "leaderList"; // current editLeader page
var leaders = []; // array of leaders
var activities = []; // array of activities
var info = new Information();

// information object
function Information() {
    this.numLeaders;
    this.numActivities;

    // get information from local storage
    this.readInformation = function() {
        var inputString = localStorage.information;

        // if no data exists, set default values
        if (inputString == null) {
            this.numLeaders = 0;
            this.numActivities = 0;

            setDefaultActivities();
        } else {
            var input = inputString.split("_");

            // accounts for the case when a certain browser already has some information, but not everything
            if (input.length < 2 + 1) {
                setDefaultActivities();
            } // if
            this.numLeaders = input[0];
            this.numActivities = input[1];
        } // else

    } // readInformation

    // save information to local storage
    this.saveInformation = function() {
        var output = "";

        output += leaders.length + "_";
        output += activities.length + "_";

        localStorage.information = output;
    } // saveInformation
} // Information

// leader object
function Leader() {
    this.firstName;
    this.lastName;
    this.ropes;
    this.lifeguard;
    this.sailing;
    this.staff;
    this.role;
    this.breaksDuring;
    this.breaksNotDuring;
    this.cabin;
    this.atCamp;
    this.number;

    // initialize leader values
    this.setValues = function(newFirstName, newLastName, newRopes, newLifeguard, newSailing, newStaff, newRole, newBreaksDuring, newBreaksNotDuring, newCabin, newAtCamp, newNumber) {
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
        this.number = newNumber;
    } // setValues

    // saves leader to localStorage
    this.saveLeader = function() {
        var output = "";
        output += this.firstName + "_" + this.lastName + "_" + this.ropes + "_" + this.lifeguard + "_";
        output += this.sailing + "_" + this.staff + "_" + this.role + "_" + this.breaksDuring + "_";
        output += this.breaksNotDuring + "_" + this.cabin + "_" + this.atCamp + "_" + this.number;

        localStorage.setItem("leader" + this.number, output);
    } // saveLeader

    // displays all information for a leader
    this.alertLeader = function() {
        var output = "";
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
        output += "number: " + this.number + "\n";
        alert(output);
    } // alertLeader
} // Leader

// activity object
function Activity() {
    this.name;
    this.intro;
    this.day;
    this.otherLeaders;
    this.ropes;
    this.number;

    // initialize activity values
    this.setValues = function(newName, newIntro, newDay, newOtherLeaders, newRopes, newNumber) {
        this.name = newName;
        this.intro = newIntro;
        this.day = newDay;
        this.otherLeaders = newOtherLeaders;
        this.ropes = newRopes;
        this.number = newNumber
    } // setValues

    // saves activity to localStorage
    this.saveActivity = function() {
        var output = "";
        output += this.name + "_" + this.intro + "_" + this.day + "_" + this.otherLeaders + "_" + this.ropes + "_" + this.number;

        localStorage.setItem("activity" + this.number, output);
    } // saveActivity

    // displays all information for an activity
    this.alertActivity = function() {
        var output = "";
        output += "Activity Name: " + this.name + "\n";
        output += "intro: " + this.intro + "\n";
        output += "day: " + this.day + "\n";
        output += "otherLeaders: " + this.otherLeaders + "\n";
        output += "ropes: " + this.ropes + "\n";
        output += "number: " + this.number + "\n";
        alert(output);
    } // alertActivity
} // Activity

// called when the page loads
function init() {
    var newLeaderForm = document.getElementById("newLeaderForm");
    var newActivityForm = document.getElementById("newActivityForm");

    info.readInformation();
    readLeaders();
    readActivities();

    // handle input for a new leader
    newLeaderForm.onsubmit = function() {
        var firstNameField = document.getElementById("newLeaderFirstName");
        var lastNameField = document.getElementById("newLeaderLastName");
        var ropesBox = document.getElementById("newLeaderRopes");
        var NLBox = document.getElementById("newLeaderNL");
        var sailingBox = document.getElementById("newLeaderSailing");
        var staffBox = document.getElementById("newLeaderStaff");
        var rolesList = document.getElementById("newLeaderRoles");
        var breaksDuringField = document.getElementById("newLeaderBreaksDuring");
        var breaksNotDuringField = document.getElementById("newLeaderBreaksNotDuring");
        var cabinsList = document.getElementById("newLeaderCabins");
        var atCampBox = document.getElementById("newLeaderAtCamp");

        if (breaksDuringField.value == "") {
            breaksDuringField.value = " ";
        } // if

        if (breaksNotDuringField.value == "") {
            breaksNotDuringField.value = " ";
        } // if

        // don't let leaders with the same name be added
        if (leaderExists(firstNameField.value, lastNameField.value) != -1) {
            alert("This leader has already been added!");
            return false;
        } // if

        var newLeader = new Leader();

        newLeader.setValues(firstNameField.value, lastNameField.value,
            ropesBox.checked, NLBox.checked, sailingBox.checked, staffBox.checked,
            rolesList.value, breaksDuringField.value, breaksNotDuringField.value,
            cabinsList.value, atCampBox.checked, leaders.length);

        leaders.push(newLeader);
        leaders[leaders.length - 1].saveLeader();
        info.saveInformation();

        alert("Leader successfully added!");

        return false;
    }; // newLeaderForm.onsubmit

    // handle input for a new activity
    newActivityForm.onsubmit = function() {
        var nameField = document.getElementById("newActivityName");
        var introField = document.getElementById("newActivityIntro");
        var dayBox = document.getElementById("newActivityDay");
        var otherLeadersBox = document.getElementById("newActivityOtherLeaders");
        var ropesBox = document.getElementById("newActivityRopes");

        if (activityExists(nameField.value) != -1) {
            alert("This activity has already been added!");
            return false;
        } // if

        var newActivity = new Activity();

        newActivity.setValues(nameField.value, introField.checked, dayBox.checked, otherLeadersBox.checked, ropesBox.checked, activities.length);

        activities.push(newActivity);
        activities[activities.length - 1].saveActivity();
        info.saveInformation();

        alert("Activity successfully added!");
        newActivity.alertActivity();
        alertActivities();

        return false;
    } // newActivityForm.onsubmit
} // init

function setDefaultActivities() {
    for (var i = 0; i < 16; i++) {
        var newActivity = new Activity();
        var name = "";
        var intro = false;
        var day = false;
        var otherLeaders = false;
        var ropes = false;

        switch(i) {
            case 0:
                name = "Archery";
                day = true;
                break;
            case 1:
                name = "Climbing Wall";
                day = true;
                ropes = true;
                break;
            case 2:
                name = "Low Ropes";
                day = true;
                ropes = true;
                break;
            case 3:
                name = "Camp Rules";
                intro = true;
                day = true;
                otherLeaders = true;
                break;
            case 4:
                name = "Swim Test & Rules";
                intro = true;
                day = true;
                otherLeaders = true;
                break;
            case 5:
                name = "Faith Fort";
                intro = true;
                day = true;
                otherLeaders = true;
                break;
            case 6:
                name = "Trust Games";
                day = true;
                break;
            case 7:
                name = "Paddle Boarding";
                day = true;
                otherLeaders = true;
                break;
            case 8:
                name = "Kayaking";
                day = true;
                otherLeaders = true;
                break;
            case 9:
                name = "Canoeing";
                day = true;
                otherLeaders = true;
                break;
            case 10:
                name = "Sailing";
                day = true;
                otherLeaders = true;
                break;
            case 11:
                name = "Faithquest";
                day = true;
                otherLeaders = true;
                break;
            case 12:
                name = "Orienteering";
                day = true;
                break;
            case 13:
                name = "No Trace";
                day = true;
                break;
            case 14:
                name = "Gnome Homes";
                day = true;
                break;
            case 15:
                name = "High Ropes";
                day = true;
                ropes = true;
                break;
        } // switch

        newActivity.setValues(name, intro, day, otherLeaders, ropes, activities.length);
        activities.push(newActivity);
        activities[activities.length - 1].saveActivity();
        info.saveInformation();
    } // for i
} // setDefaultActivities

// gets all leaders from localStorage
function readLeaders() {
    for (var i = 0; i < info.numLeaders; i++) {
        var inputString = localStorage.getItem("leader" + i);
        var input = inputString.split("_");

        var tempLeader = new Leader();
        tempLeader.firstName = input[0];
        tempLeader.lastName = input[1];
        tempLeader.ropes = input[2];
        tempLeader.lifeguard = input[3];
        tempLeader.sailing = input[4];
        tempLeader.staff = input[5];
        tempLeader.role = input[6];
        tempLeader.breaksDuring = input[7];
        tempLeader.breaksNotDuring = input[8];
        tempLeader.cabin = input[9];
        tempLeader.atCamp = input[10];
        tempLeader.number = parseInt(input[11]);

        if (tempLeader.ropes == "true") {
            tempLeader.ropes = true;
        } else {
            tempLeader.ropes = false;
        } // else

        if (tempLeader.lifeguard == "true") {
            tempLeader.lifeguard = true;
        } else {
            tempLeader.lifeguard = false;
        } // else

        if (tempLeader.sailing == "true") {
            tempLeader.sailing = true;
        } else {
            tempLeader.sailing = false;
        } // else

        if (tempLeader.staff == "true") {
            tempLeader.staff = true;
        } else {
            tempLeader.staff = false;
        } // else

        if (tempLeader.atCamp == "true") {
            tempLeader.atCamp = true;
        } else {
            tempLeader.atCamp = false;
        } // else

        leaders.push(tempLeader);
    } // for i
} // readLeaders

// gets all activites from localStorage
function readActivities() {
    for (var i = 0; i < info.numActivities; i++) {
        var inputString = localStorage.getItem("activity" + i);
        var input = inputString.split("_");

        var tempActivity = new Activity();
        tempActivity.name = input[0];
        tempActivity.day = input[1];
        tempActivity.otherLeaders = input[2];
        tempActivity.ropes = input[3];
        tempActivity.number = parseInt(input[4]);

        if (tempActivity.intro == "true") {
            tempActivity.intro = true;
        } else {
            tempActivity.intro = false;
        } // else

        if (tempActivity.day == "true") {
            tempActivity.day = true;
        } else {
            tempActivity.day = false;
        } // else

        if (tempActivity.otherLeaders == "true") {
            tempActivity.otherLeaders = true;
        } else {
            tempActivity.otherLeaders = false;
        } // else

        if (tempActivity.ropes == "true") {
            tempActivity.ropes = true;
        } else {
            tempActivity.ropes = false;
        } // else

        activities.push(tempActivity);
    } // for i
} // readActivities

// checks if a leader with the given name exists.
// returns the index of the leader if they exist, -1 otherwise
function leaderExists(firstName, lastName) {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    var currFirst = "";
    var currLast = "";

    for (var i = 0; i < leaders.length; i++) {
        currFirst = leaders[i].firstName.toLowerCase();
        currLast = leaders[i].lastName.toLowerCase();
        if (firstName == currFirst && lastName == currLast) {
            return i;
        } // if
    } // for i

    return -1;
} // leaderExists

function activityExists(name) {
    name = name.toLowerCase();
    var currName = "";

    for (var i = 0; i < activities.length; i++) {
        currName = activities[i].name.toLowerCase();
        if (currName == name) {
            return i;
        } // if
     } // for i

     return -1;
} // activityExists

// deletes a leader
function deleteLeader(i) {
    leaders.splice(i, 1);
    info.saveInformation();

    for (var j = i; j < leaders.length; j++) {
        leaders[j].number--;
        leaders[j].saveLeader();
    } // for j

    alert("Leader successfully deleted!");
} // deleteLeader

// deletes an activity
function deleteActivity(i) {
    activities.splice(i, 1);
    info.saveInformation();

    for (var j = i; j < activities.length; j++) {
        activities[j].number--;
        activities[j].saveActivity();
    } // for j
} // deleteActivity

// alerts a list of leaders with their first and last name
function alertLeaders() {
    var output = "List of leaders:\n";

    for (var i = 0; i < leaders.length; i++) {
        output += leaders[i].firstName + " " + leaders[i].lastName;
        output += "\n";
    } // for i

    alert(output)
} // alertLeaders

// alerts a list of activities
function alertActivities() {
    var output = "List of activities:\n";

    for (var i = 0; i < activities.length; i++) {
        output += activities[i].name + "\n";
    } // for i

    alert(output);
} // alertActivities

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
        case "editInfo":
            currentScreen = currentEditInfo;
            currentEditInfo = newScreen;
            break;
        case "editLeader":
            currentScreen = currentEditLeader;
            currentEditLeader = newScreen;
            break;
    } // switch
    document.getElementById(currentScreen).className = "hidden";
    document.getElementById(newScreen).className = "visible";
    if (currentScreen == "home" && newScreen != "home") {
        document.getElementById(newScreen + "Button").className = "activeMenuButton";
    } else if (newScreen == "home" && currentScreen != "home") {
        document.getElementById(currentScreen + "Button").className = "menuButton";
    } else {
        // not all current screens have associated buttons
        try {
            document.getElementById(currentScreen + "Button").className = "menuButton";
            document.getElementById(newScreen + "Button").className = "activeMenuButton";
        } catch (err) {

        } // catch
    }
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
