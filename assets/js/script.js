var team = {};
var teamNames = "https://www.balldontlie.io/api/v1/teams";
var seasonGames = "https://www.balldontlie.io/api/v1/games?seasons[]=2018&team_ids[]=6&per_page=100";
var selectTeamObject = document.querySelector(".team-select");
var submitButton = document.querySelector("section button");




//fetch all NBA team names from balldontlie
fetch(teamNames).then(function (response) {
  // request was successful
  if (response.ok) {
    return response.json();
  }
})
  .then(function (data) {
    var team = data.data;

    for (var i = 0; i < team.length; i++) {
      var teamNamesEl = document.createElement("option");
      var teamID = team[i].id;
      teamNamesEl.setAttribute("value", teamID);
      teamNamesEl.innerHTML = team[i].full_name
      selectTeamObject.appendChild(teamNamesEl)
    };

  });

// choose team function
var chooseTeam = function () {
  var teamSelected = document.querySelector("option").textContent;
  console.log(teamSelected);
};

// create clickable select elements that triggers functions to pull years in the playoff and championships
submitButton.addEventListener("click", chooseTeam)

