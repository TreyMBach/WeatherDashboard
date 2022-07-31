
var apiKey = "20667418638774cf5af9135791e28d78"
var cityLocation = "london";
var requestURL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;

searchBtn = $("#searchButton")

function getCity(city){
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  
    fetch(geocodeUrl)
      .then(function (response) {
        console.log(response.status);
      
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        getWeather(data[0].lat, data[0].lon);
      });
    }
  
      function getWeather(lat, lon){
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  
        fetch(weatherUrl)
        .then(function (response) {
          console.log(response.status);
        
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
      }
  
      searchBtn.on("click", function(){
        var cityInput = $(this).siblings("#searchSearchInput").val();
  
        getCity(cityInput);
      });


