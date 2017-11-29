// this file contains all functions that print the contents of a div,
// to eliminate clutter in the main js file

// prints the content of the leaderList div
function displayLeaders() {
    var content = "<h2>Click a leader to edit their information:</h2><ul>";

    for (var i = 0; i < leaders.length; i++) {
        content += "<li><a href=\"javascript:changeScreen('editLeader', 'leaderInfo'), displayLeaderToEdit(" + i + ")\" class='editLeaderList'>";
        content += leaders[i].firstName + " " + leaders[i].lastName + "</a></li>";
    } // for i

    content += "</ul>";

    document.getElementById("leaderList").innerHTML = content;
} // displayLeaders

// prints the content of the leaderInfo div
function displayLeaderToEdit(i) {
    var index = i;

    var content = "<button id='backToLeadersButton' onClick=\"changeScreen('editLeader', 'leaderList'), displayLeaders()\">";
    content += "Back to leaders</button><br><br>";

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
    content += "<option value='crewLIT'";
    if (leaders[i].role == "crewLIT") {
        content += " selected";
    } // if
    content += ">Crew/LIT Leader</option>";
    content += "</select><br><br>";

    content += "Break preferences (separate using a comma and a space):<br>";
    content += "This leader likes to have breaks during:";
    content += "<input type='text' id='editLeaderBreaksDuring' value='";
    if (leaders[i].breaksDuring != " ") {
        content += leaders[i].breaksDuring;
    } // if
    content += "'><br>";
    content += "This leader does not like to have breaks during:";
    content += "<input type='text' id='editLeaderBreaksNotDuring' value='";
    if (leaders[i].breaksNotDuring != " ") {
        content += leaders[i].breaksNotDuring;
    } // if
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
    content += "</form><hr>";

    content += "<button id='deleteButton' class='deleteButton' onClick=\"changeScreen('editLeader', 'deleteLeader'), displayDeleteLeader(" + index + ")\">";
    content += "Delete</button>";

    document.getElementById("leaderInfo").innerHTML = content;

    editLeaderForm.onsubmit = function () {
        var firstNameField = document.getElementById("editLeaderFirstName");
        var lastNameField = document.getElementById("editLeaderLastName");
        var ropesBox = document.getElementById("editLeaderRopes");
        var NLBox = document.getElementById("editLeaderNL");
        var sailingBox = document.getElementById("editLeaderSailing");
        var staffBox = document.getElementById("editLeaderStaff");
        var volunteerBox = document.getElementById("editLeaderVolunteer");
        var rolesList = document.getElementById("editLeaderRoles");
        var breaksDuringField = document.getElementById("editLeaderBreaksDuring");
        var breaksNotDuringField = document.getElementById("editLeaderBreaksNotDuring");
        var cabinsList = document.getElementById("editLeaderCabins");
        var atCampBox = document.getElementById("editLeaderAtCamp");

        // check for invalid input
        if (!staffBox.checked && !volunteerBox.checked) {
            alert("Please check the Staff box or the Volunteer box");
            return false;
        } else if (staffBox.checked && volunteerBox.checked) {
            alert("A leader cannot be staff and volunteer! Please uncheck one of the boxes");
            return false;
        } // else if

        // don't let the name be changed to an existing leader
        leaderIndex = leaderExists(firstNameField.value, lastNameField.value)
        if (leaderIndex >= 0 && leaderIndex != index) {
            alert("This is the name of a different leader!");
            return false;
        } // if

        if (breaksDuringField.value == "") {
            breaksDuringField.value = " ";
        } // if

        if (breaksNotDuringField.value == "") {
            breaksNotDuringField.value = " ";
        } // if

        leaders[index].firstName = firstNameField.value;
        leaders[index].lastName = lastNameField.value;
        leaders[index].ropes = ropesBox.checked;
        leaders[index].lifeguard = NLBox.checked;
        leaders[index].sailing = sailingBox.checked;
        leaders[index].staff = staffBox.checked;
        leaders[index].role = rolesList.value;
        leaders[index].breaksDuring = breaksDuringField.value;
        leaders[index].breaksNotDuring = breaksNotDuringField.value;
        leaders[index].cabin = cabinsList.value;
        leaders[index].atCamp = atCampBox.checked;
        leaders[index].saveLeader();

        alert("Information successfully saved!");
        displayLeaders();
        changeScreen('editLeader', 'leaderList');

        return false;
    } // editLeaderForm.onsubmit
} // displayLeaderToEdit

// prints the content of the deleteLeader div
function displayDeleteLeader(i) {
    var content = "";

    content += "Careful! Are you sure you want to delete <strong>" + leaders[i].firstName + " " + leaders[i].lastName;
    content += "</strong>    and all of their information?<br><br>";
    content += "<button id='deleteLeaderYesButton' class='deleteButton' onClick=\"deleteLeader(" + i + "), changeScreen('editLeader', 'leaderList'), displayLeaders()\">";
    content += "Yes</button>    ";
    content += "<button id='deleteLeaderNoButton' class='deleteButton' onClick=\"changeScreen('editLeader', 'leaderInfo')\">";
    content += "No</button>";

    document.getElementById("deleteLeader").innerHTML = content;
} // displayDeleteLeader
