
var apiKey = "20667418638774cf5af9135791e28d78"
var units = "imperial"
var cityLocation = "london";
var requestURL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;

searchBtn = document.getElementById("searchButton")
searchForecastContainer = document.getElementById("searchForecastContainer")

// direct

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
        var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
  
        fetch(weatherUrl)
        .then(function (response) {
          console.log(response.status);
        
          return response.json();
        })
        .then(function (data) {
          console.log(data);


          // displays the date, an icon representation of weather conditions, the temperature, the wind speed, the humidity
          for (let i = 1; i < 6; i+5){  
    
            var searchResultDate = document.createElement("ul")
            searchResultDate.innerText = data.list[i].dt_txt

            var currentTemp = data.list[0].main.temp
            var currentWind = data.list[0].wind.speed
            var currentHumidity = data.list[0].main.humidity
            var currentWeather = data.list[0].weather[0].main

            var searchResultIcon = document.createElement("ul")
            if(currentTemp >= 80){
              searchResultIcon.innerText = "good"
            } else if (currentTemp < 80 && currentTemp > 70){
              searchResultIcon.innerText = "aight"
            } else {
              searchResultIcon.innerText = "could be better"
            }

            var searchResultTemp = document.createElement("ul")
            searchResultTemp.innerText = currentTemp

            var searchResultWind = document.createElement("ul")
            searchResultWind.innerText = currentWind + " mph winds"

            var searchResultHumidity = document.createElement("ul")
            searchResultHumidity.innerText = currentHumidity + "% Humidity"

            var searchResultWeather = document.createElement("img")
            searchResultWeather.classList.add("searchWeatherImg")
            
            if(currentWeather == "Clouds"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png"
            } else if (currentWeather == "Rain"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2017/01/29/11/09/rain-2017532_1280.png"
            }

            var searchResultCard = document.createElement("div")


            searchResultCard.classList.add("card")
            searchResultCard.classList.add("bg-dark")
            searchResultCard.classList.add("mx-2")
            searchResultCard.classList.add("text-white")


            searchForecastContainer.append(searchResultCard)
            searchResultCard.appendChild(searchResultDate)
            searchResultCard.appendChild(searchResultIcon)
            searchResultCard.appendChild(searchResultTemp)
            searchResultCard.appendChild(searchResultWind)
            searchResultCard.appendChild(searchResultHumidity)
            searchResultCard.appendChild(searchResultWeather)
            
          }

          var searchInput = document.getElementById("citySearchInput").value; 
          var currentLocationEl = document.getElementById("currentLocation")
          var currentTempEl = document.getElementById("currentTemp")
          var currentWindEl = document.getElementById("currentWind")
          var currentHumidityEl = document.getElementById("currentHumidity")
          var currentUVEl = document.getElementById("currentUV")

          currentLocationEl.innerHTML = searchInput + " " + data.list[0].dt_txt
          currentTempEl.innerHTML = currentTemp + " Degrees"
          currentWindEl.innerHTML = currentWind + " MPH"
          currentHumidityEl.innerHTML = currentHumidity + " Percent Humidity"
          currentUVEl.innerHTML = "STILL TRYING TO FIND"

        });
      }

      searchBtn.addEventListener("click", function(){
        searchInput = document.getElementById("citySearchInput").value;
        console.log(searchInput)
        getCity(searchInput);
      })



