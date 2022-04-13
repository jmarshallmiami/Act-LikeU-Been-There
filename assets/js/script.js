var teamNames = "https://www.balldontlie.io/api/v1/teams";
var teamSeasonGames = "https://www.balldontlie.io/api/v1/games?seasons[]=1979&team_ids[]=3"
var selectTeamObject = document.querySelector(".team-select");
var submitButton = document.querySelector("section button");

var submitHandler = function(event) {
  event.preventDefault();
}

//     for (var i = 0; i < teamData.length; i++) {
//       var teamNamesEl = document.createElement("option");
//       var teamID = teamData[i].id;
//       teamNamesEl.setAttribute("value", teamID);
//       teamNamesEl.innerHTML = teamData[i].full_name
//       selectTeamObject.appendChild(teamNamesEl)
//     };
//   });

//fetch all available years names from balldontlie
fetch(teamSeasonGames)
  .then(function (response) {
    // request was successful
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data.data);
  });


// create clickable select elements that triggers functions to pull years in the playoff and championships
// submitButton.addEventListener("click", chooseTeam)

// FUNCTION: retreive team name and id from select HTML element options

// FUNCTION: 

