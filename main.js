/************************************************************************
 * Name:    Pringle Break Scheduler
 * Author:  Connor Pickles
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