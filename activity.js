// all functions that are directly related to the activity object

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

// deletes an activity
function deleteActivity(i) {
    activities.splice(i, 1);
    info.saveInformation();

    for (var j = i; j < activities.length; j++) {
        activities[j].number--;
        activities[j].saveActivity();
    } // for j
} // deleteActivity

// alerts a list of activities
function alertActivities() {
    var output = "List of activities:\n";

    for (var i = 0; i < activities.length; i++) {
        output += activities[i].name + "\n";
    } // for i

    alert(output);
} // alertActivities

// pre loads activities
function setDefaultActivities() {
    for (var i = 0; i < 16; i++) {
        var newActivity = new Activity();
        var name = "";
        var intro = false;
        var day = false;
        var otherLeaders = false;
        var ropes = false;

        switch (i) {
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