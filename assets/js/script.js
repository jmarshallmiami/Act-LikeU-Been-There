var teamNames = "https://www.balldontlie.io/api/v1/teams"
var seasonGames = "https://www.balldontlie.io/api/v1/games?seasons[]=2018&team_ids[]=6&per_page=100"
var selectTeamObject = document.querySelector(".team-select");


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
      console.log(teamNamesEl)
      selectTeamObject.appendChild(teamNamesEl)
    };
  });
  
  // fetch all years seasons available for selected team and search for "Postseason" etc. to index which years the team has reached the post season in an array
  fetch(seasonGames).then(function (response) {
    // request was successful
    if (response.ok) {
      return response.json();
    }
  })
    .then(function (data) {
      console.log(data.data);

    });
  
  // fetch all years seasons available for selected team and search for "Conference Championship" etc. to index which years the team has reached the post season in an array
  
  // fetch all years seasons available for selected team and search for "NBA Champship" etc. to index which years the team has reached the post season in an array


  // create clickable select elements that triggers functions to pull years in the playoff and championships
document.addEventListener("click", selectTeamObject)