var teamNames = "https://www.balldontlie.io/api/v1/teams"
var selectTeamObject = document.querySelector(".team-select");


//fetch all NBA team names from
fetch(teamNames).then(function (response) {
  // request was successful
  if (response.ok) {
    return response.json();
  }
})
  .then(function (data) {
    var teams = data.data;

    for (var i = 0; i < teams.length; i++) {
      var teamNamesEl = document.createElement("option");
      teamNamesEl.setAttribute("value", i);
      teamNamesEl.innerHTML = teams[i].full_name
      console.log(teamNamesEl);
      selectTeamObject.appendChild(teamNamesEl)
    };
  });

