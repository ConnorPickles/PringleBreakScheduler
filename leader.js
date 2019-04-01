// all functions that are directly related to the leader object

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

// alerts a list of leaders with their first and last name
function alertLeaders() {
    var output = "List of leaders:\n";

    for (var i = 0; i < leaders.length; i++) {
        output += leaders[i].firstName + " " + leaders[i].lastName;
        output += "\n";
    } // for i

    alert(output)
} // alertLeaders