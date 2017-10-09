/************************************************************************
* Name:    Pringle Break Scheduler
* Authors: Connor Pickles
* Date:    September 11th, 2017
* Purpose: To create break schedules for Camp Pringle's summer program
*************************************************************************/
var currentMain = "home"; // current main page
var currentNewInfo = "newLeader"; // current newInfo page
var currentEditInfo = "editLeader"; // current editInfo page
var currentEditLeader = "leaderList"; // current editLeader page
var leaders = []; // array of leaders
var info = new information();

// information object
function information() {
    this.numLeaders;

    // get information from local storage
    this.readInformation = function () {
        var inputString = localStorage.information;

        // if no data exists, set default values
        if (inputString == null) {
            this.numLeaders = 0;
        } else {
            var input = inputString.split("_");
            this.numLeaders = input[0];
        } // else

    } // readInformation

    // save information to local storage
    this.saveInformation = function () {
        var output = "";

        output += leaders.length + "_";

        localStorage.information = output;
    } // saveInformation
} // information

// leader object
function leader() {
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
    this.setValues = function (newFirstName, newLastName, newRopes, newLifeguard, newSailing, newStaff, newRole, newBreaksDuring, newBreaksNotDuring, newCabin, newAtCamp, newNumber) {
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

    // saves leader to the HTML file
    this.saveLeader = function () {
        var output = "";
        output += this.firstName + "_" + this.lastName + "_" + this.ropes + "_" + this.lifeguard + "_";
        output += this.sailing + "_" + this.staff + "_" + this.role + "_" + this.breaksDuring + "_";
        output += this.breaksNotDuring + "_" + this.cabin + "_" + this.atCamp + "_" + this.number;

        localStorage.setItem("leader" + this.number, output);
    } // saveLeader

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

    info.readInformation();
    readLeaders();

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

        if (breaksDuringField.value == "") {
            breaksDuringField.value = " ";
        } // if

        if (breaksNotDuringField.value == "") {
            breaksNotDuringField.value = " ";
        } // if

        // don't let leaders with the same name be added
        if (leaderExists(firstNameField.value, lastNameField.value)) {
            alert("This leader has already been added!");
            return false;
        } // if

        var newLeader = new leader();

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

    // TODO: add editLeaderForm.onsubmit functionality
} // init

// gets all leaders from localStorage
function readLeaders() {
    for (var i = 0; i < info.numLeaders; i++) {
        var inputString = localStorage.getItem("leader" + i);
        var input = inputString.split("_");

        var tempLeader = new leader();
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
        tempLeader.number = input[11];

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

        leaders.push(tempLeader);
    } // for i
} // readLeaders

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
} // alertLeaders

function listLeaders() {
    var content = "<h2>Click a leader to edit their information:</h2><ul>";

    for (var i = 0; i < leaders.length; i++) {
        content += "<li><a href=\"javascript:changeScreen('editLeader', 'leaderInfo'), displayLeaderToEdit(" + i + ")\" class='editLeaderList'>";
        content += leaders[i].firstName + " " + leaders[i].lastName + "</a></li>";
    } // for i

    content += "</ul>";

    document.getElementById("leaderList").innerHTML = content;
} // listLeaders

function displayLeaderToEdit(i) {
    var content = "<h2><a href=\"javascript:changeScreen('editLeader', 'leaderList'), listLeaders()\" class='editLeaderList'>Back to leaders</a></h2>";
    content += "<form id='editLeaderForm'>";
    content += "First Name:<br>";
    content += "<input type='text' id='editLeaderFirstName' value='" + leaders[i].firstName + "' required><br>";
    content += "Last Name:<br>";

    content += "<input type='text' id='editLeaderLastName' value='" + leaders[i].lastName + "' required><br><br>";
    content += "Please check all that apply:<br>";
    content += "<input type='checkbox' id='editLeaderRopes'";
    if (leaders[i].ropes) {
        content += " checked";
    } // if
    content += ">Ropes Training<br>";
    content += "<input type='checkbox' id='editLeaderNL'";
    if (leaders[i].lifeguard) {
        content += " checked";
    } // if
    content += ">Lifeguard<br>";
    content += "<input type='checkbox' id='editLeaderSailing'";
    if (leaders[i].sailing) {
        content += " checked";
    } // if
    content += ">Can Sail<br><br>";

    content += "Staff or Volunteer?<br>";
    content += "<input type='checkbox' id='editLeaderStaff'";
    if (leaders[i].staff) {
        content += " checked";
    } // if
    content += ">Staff<input type='checkbox' id='editLeaderVolunteer'";
    if (!leaders[i].staff) {
        content += " checked";
    } // if
    content += ">Volunteer<br><br>";

    content += "Role: <select id='editLeaderRoles'>";
    content += "<option value='cabinLeader'";
    if (leaders[i].role == "cabinLeader") {
        content += " selected";
    } // if
    content += ">Cabin Leader</option>";
    content += "<option value='lifeguard'";
    if (leaders[i].role == "lifeguard") {
        content += " selected";
    } // if
    content += ">Lifeguard</option>";
    content += "<option value='chaplin'";
    if (leaders[i].role == "chaplin") {
        content += " selected";
    } // if
    content += ">Chaplin</option>";
    content += "<option value='dayCampLeader'";
    if (leaders[i].role == "dayCampLeader") {
        content += " selected";
    } // if
    content += ">Day Camp Leader</option>";
    content += "<option value='ropesLeader'";
    if (leaders[i].role == "ropesLeader") {
        content += " selected";
    } // if
    content += ">Ropes Leader</option>";
    content += "<option value='creLIT'";
    if (leaders[i].role == "crewLIT") {
        content += " selected";
    } // if
    content += ">Crew/LIT Leader</option>";
    content += "</select><br><br>";

    content += "Break preferences (separate using a comma and a space):<br>";
    content += "This leader likes to have breaks during:";
    content += "<input type='text' id='editLeaderBreaksDuring' value='";
    content += leaders[i].breaksDuring;
    content += "'><br>";
    content += "This leader does not like to have breaks during:";
    content += "<input type='text' id='editLeaderBreaksNotDuring' value='";
    content += leaders[i].breaksNotDuring;
    content += "'><br><br>";

    content += "Cabin: <select id='editLeaderCabins'>";
    content += "<option value='red'";
    if (leaders[i].cabin == "red") {
        content += " selected";
    } // if
    content += ">Red</option>";
    content += "<option value='orange'";
    if (leaders[i].cabin == "orange") {
        content += " selected";
    } // if
    content += ">Orange</option>";
    content += "<option value='yellow'";
    if (leaders[i].cabin == "yellow") {
        content += " selected";
    } // if
    content += ">Yellow</option>";
    content += "<option value='green'";
    if (leaders[i].cabin == "green") {
        content += " selected";
    } // if
    content += ">Green</option>";
    content += "<option value='blue'";
    if (leaders[i].cabin == "blue") {
        content += " selected";
    } // if
    content += ">Blue</option>";
    content += "<option value='indigo'";
    if (leaders[i].cabin == "indigo") {
        content += " selected";
    } // if
    content += ">Indigo</option>";
    content += "<option value='violet'";
    if (leaders[i].cabin == "violet") {
        content += " selected";
    } // if
    content += ">Violet</option>";
    content += "<option value='gold'";
    if (leaders[i].cabin == "gold") {
        content += " selected";
    } // if
    content += ">Gold</option>";
    content += "<option value='silver'";
    if (leaders[i].cabin == "silver") {
        content += " selected";
    } // if
    content += ">Silver</option>";
    content += "<option value='none'";
    if (leaders[i].cabin == "none") {
        content += " selected";
    } // if
    content += ">No Cabin</option>";
    content += "</select><br><br>";

    content += "Check the box if this leader is at camp this week:";
    content += "<input type='checkbox' id='editLeaderAtCamp'";
    if (leaders[i].atCamp) {
        content += " checked";
    } // if
    content += "><br><br>";
    content += "<input type='submit' value='Submit'>";
    content += "</form>";

    // TODO: add a delete leader button

    document.getElementById("leaderInfo").innerHTML = content;
} // displayLeaderToEdit

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
