var team = [];
var teamNames = "https://www.balldontlie.io/api/v1/teams";
var teamSeasonGames = `https://www.balldontlie.io/api/v1/games?seasons[]=${selectedYear}&team_ids[]=${selectedTeam}&per_page=100`;
var selectTeamObject = document.querySelector(".team-select");
var yearSelectObject = document.querySelector(".year-select");

var submitHandler = function (event) {
  event.preventDefault();
};

// click submit button and collect user inputs
var submitButton = document.querySelector(".button.is-info.is-rounded.m-1");
submitButton.onclick = myFunction;

function myFunction() {
  var selectedTeam = document.querySelector(".team-select").value;
  var selectedYear = document.querySelector(".year-select").value;
  console.log(selectedTeam, selectedYear);
};


for (i = 1979; i < 2022; i++) {
var yearOption = document.createElement("option")
yearOption.setAttribute("value", i)
yearOption.innerHTML = i;
yearSelectObject.appendChild(yearOption)
};


// create dropdown list of teams for available to check the year and record (30 teams available)
fetch(teamNames).then(function (response) {
  // request was successful
  if (response.ok) {
    return response.json();
  }
})
  .then(function (data) {
    var teamData = data.data

    // dynamically generates select element options with names that are in the 
    for (var i = 0; i < teamData.length; i++) {
      var teamNamesEl = document.createElement("option");
      var teamID = teamData[i].id;
      teamNamesEl.setAttribute("value", teamID);
      teamNamesEl.innerHTML = teamData[i].full_name
      selectTeamObject.appendChild(teamNamesEl)
      team[i] = {
        id: teamData[i].id,
        name: teamData[i].full_name
      }
    };
  });

//fetch all available game scores for each year
fetch(teamSeasonGames).then(function (response) {
  // request was successful
  if (response.ok) {
    return response.json();
  }
})
  .then(function (data) {
    // win, loss, tie object for team record
    var record = {
      win: 0,
      loss: 0,
      tie: 0
    };

    for (var i = 0; i < data.data.length; i++) {

      // setting variable for the selected team id to compare to home or away score
      var homeScore = data.data[i].home_team_score;
      var visitorScore = data.data[i].visitor_team_score;

      // setting variable for the selected team id to compare to home or away team id
      var homeTeamId = data.data[i].home_team.id;
      var visitorTeamId = data.data[i].visitor_team.id;

      //  did the team picked win, lose or tie in this game
      if (homeTeamId === team[1].id && homeScore > visitorScore) {
        record.win = record.win + 1;
      }
      else if (visitorTeamId === team[1].id && visitorScore > homeScore) {
        record.win = record.win + 1;
      }
      else if (visitorScore === homeScore) {
        record.tie = record.tie + 1;
      }
      else {
        record.loss = record.loss + 1;
      }
    };
    return record;

  });


// FUNCTION: modal close button

// // modal was triggered
// $("#task-form-modal").on("show.bs.modal", function () {
//   // clear values
//   $("#modalTaskDescription, #modalDueDate").val("");
// });

// // modal is fully visible
// $("#task-form-modal").on("shown.bs.modal", function () {
//   // highlight textarea
//   $("#modalTaskDescription").trigger("focus");
// });

// // save button in modal was clicked
// $("#task-form-modal .btn-primary").click(function () {
//   // get form values
//   var taskText = $("#modalTaskDescription").val();
//   var taskDate = $("#modalDueDate").val();

//   if (taskText && taskDate) {
//     createTask(taskText, taskDate, "toDo");

//     // close modal
//     $("#task-form-modal").modal("hide");