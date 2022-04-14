//object for the team to house id and full name 
var team = [];

// api request for an array of all available team objects for full name generation
var teamNames = "https://www.balldontlie.io/api/v1/teams";


// select html elements
var selectTeamObject = document.querySelector(".team-select");
var yearSelectObject = document.querySelector(".year-select");

var submitHandler = function (event) {
  event.preventDefault();
};

// close modal button that closes modal and reopens if user clicks on the header
function closeModal() {
  $(".close").click(function () {
    $(".open").removeClass("is-active")
    $(".open-modal").click(function () {
      $(".open").addClass("is-active")
    })
  })
};
closeModal();

function pullGif

// click submit button and collect user inputs
var submitButton = document.querySelector(".button.is-info.is-rounded.m-1");
submitButton.onclick = clickFunction;

function clickFunction() {
  // created variables for team/year
  var selectedTeam = document.querySelector(".team-select").value;
  var selectedYear = document.querySelector(".year-select").value;

  // updated template literal values are passed into api
  var teamSeasonGames = `https://www.balldontlie.io/api/v1/games?seasons[]=${selectedYear}&team_ids[]=${selectedTeam}&per_page=110`;

  //
  function displayTeamName(value) {
    var teamPlaceholder = document.querySelector("h2.has-text-centered.title");
    teamPlaceholder.innerHTML = team[value - 1].name;

  };
  displayTeamName(selectedTeam);

  //loading screen with giphy gif
  var giphyUrl = "https://api.giphy.com/v1/gifs/3o7aTnQqygA3TcukFi?api_key=mC5x9iaiIAu1vTZWk1WuVU6xy8fWfhLS";
  console.log(giphyUrl)
  fetch(giphyUrl).then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
    .then(function (data) {
      var giphyGif = data.data.images.original.url;

      // replace NBA logo with funny gif while data is loading for 10 seconds
      var imageLogoOveride = document.getElementById("team-logo");

      imageLogoOveride.setAttribute("src", giphyGif);
    });

  //fetch all available game scores for the selected year
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

      var playoffRecord = {
        win: 0,
        loss: 0,
        tie: 0
      };

      for (var i = 0; i < data.data.length; i++) {
        // checks if a game was a playoff or regular season game
        var postSeasonBoolean = data.data[i].postseason;

        // setting variable for the selected team id to compare to home or away score
        var homeScore = data.data[i].home_team_score;
        var visitorScore = data.data[i].visitor_team_score;

        // setting variable for the selected team id to compare to home or away team id
        var homeTeamId = data.data[i].home_team.id;
        var visitorTeamId = data.data[i].visitor_team.id;

        // playoff record
        if (postSeasonBoolean = true) {
          //  did the team win, lose or tie in this game
          if (homeTeamId === team[selectedTeam - 1].id && homeScore > visitorScore) {
            playoffRecord.win = playoffRecord.win + 1;
          }
          else if (visitorTeamId === team[selectedTeam - 1].id && visitorScore > homeScore) {
            playoffRecord.win = playoffRecord.win + 1;
          }
          else if (visitorScore === homeScore) {
            playoffRecord.tie = playoffRecord.tie + 1;
          }
          else {
            playoffRecord.loss = playoffRecord.loss + 1;
          };
        };

        // regular season record
        if (!postSeasonBoolean) {
          //  did the team picked win, lose or tie in this game
          if (homeTeamId === team[selectedTeam - 1].id && homeScore > visitorScore) {
            record.win = record.win + 1;
          }
          else if (visitorTeamId === team[selectedTeam - 1].id && visitorScore > homeScore) {
            record.win = record.win + 1;
          }
          else if (visitorScore === homeScore) {
            record.tie = record.tie + 1;
          }
          else {
            record.loss = record.loss + 1;
          };
        };
      };

      var yearChosen = document.getElementById("year-chosen");
      var yearRegularSeason = document.getElementById("regular-season");
      var yearPlayoff = document.getElementById("playoffs");

      // year element displayed under logo
      yearChosen.innerHTML = "Year:     " + selectedYear;

      // creating 
      yearRegularSeason.innerHTML = record.win + " - " + record.loss + " - " + record.tie;
      yearPlayoff.innerHTML = playoffRecord.win + " - " + playoffRecord.loss + " - " + playoffRecord.tie;

      // if the team had a winning regular season record display as green and lossing recond as red
      if (record.win >= record.loss) {
        yearRegularSeason.className = "has-text-success";
      }
      else {
        yearRegularSeason.className = "has-text-danger";
      };

      // if the team had a winning playoff record display is as green
      if (playoffRecord.win === 0 && playoffRecord.loss === 0) {
        yearPlayoff.className = "has-text-danger";
        yearPlayoff.innerHTML = "Too Bad No Playoffs!!";

      }
      else if (playoffRecord.win >= playoffRecord.loss) {
        yearPlayoff.className = "has-text-success";
      }
      else {
        yearPlayoff.className = "has-text-danger";
      };
    });
};




// generating dropdown list for years 
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


