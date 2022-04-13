var teamNames = "https://www.balldontlie.io/api/v1/teams";
var teamSeasonGames = "https://www.balldontlie.io/api/v1/games?seasons[]=1979&team_ids[]=8&per_page=100"
var selectTeamObject = document.querySelector(".team-select");
var submitButton = document.querySelector("section button");

var submitHandler = function(event) {
  event.preventDefault();
}

fetch(teamNames).then(function (response) {
  // request was successful
  if (response.ok) {
    return response.json();
  }
})
  .then(function (data) {
    var teamData = data.data
    
    for (var i = 0; i < teamData.length; i++) {
      var teamNamesEl = document.createElement("option");
      var teamID = teamData[i].id;
      teamNamesEl.setAttribute("value", teamID);
      teamNamesEl.innerHTML = teamData[i].full_name
      selectTeamObject.appendChild(teamNamesEl)
    };
  });

//fetch all available game scores for each year
fetch(teamSeasonGames)
  .then(function (response) {
    // request was successful
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    for (var i = 0; i < 3 /*data.data.length*/; i++) {
      // setting variable for the selected team id to compare to home or away score
      var homeScore = data.data[i].home_team_score 
      var visitorScore = data.data[i].visitor_team_score
      
      // setting variable for the selected team id to compare to home or away team id
      var homeTeamId = data.data[i].home_team.id
      var visitorTeamId = data.data[i].visitor_team.id


      console.log(homeTeamId);
      console.log(visitorTeamId)
      console.log(data.data[i]);
    };


  });


// create clickable select elements that triggers functions to pull years in the playoff and championships
// submitButton.addEventListener("click", chooseTeam)

// FUNCTION: retreive team name and id from select HTML element options

// FUNCTION: 

