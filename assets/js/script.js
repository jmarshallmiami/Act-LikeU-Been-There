var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/ncaamb/trial/v7/en/league/seasons.json?api_key=2av3gz3ykys9r8sd4qaq8urm"


// make a get request to url
fetch(apiUrl).then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
        console.log(data);
      }
    );
  } else {
 console.log("No Data Found")
  }
});