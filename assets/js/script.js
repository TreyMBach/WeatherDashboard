
var apiKey = "20667418638774cf5af9135791e28d78"
var units = "imperial"
var cityLocation = "london";
var requestURL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;
var recentSearches = []
var recentSearchesListEl = document.getElementById("recentSearchesList")

searchBtn = document.getElementById("searchButton")
searchForecastContainer = document.getElementById("searchForecastContainer")



function getCity(city){
    var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  
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
        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&exclude=hourly,minutely,alerts`
  
        fetch(weatherUrl)
        .then(function (response) {
          console.log(response.status);
        
          return response.json();
        })
        .then(function (data) {
          console.log(data);


          // displays the date, an icon representation of weather conditions, the temperature, the wind speed, the humidity
          for (let i = 1; i < 6; i++){  
    
            var searchResultDate = document.createElement("ul")
            searchResultDate.innerHTML = moment.unix(data.daily[i].dt).format("dddd, MMMM Do YYYY") 

            var currentTemp = data.current.temp
            var currentWind = data.current.wind_speed
            var currentHumidity = data.current.humidity
            // var currentWeather = data.current.weather[0].main
            var currentUV = data.daily[0].uvi


            // var searchResultIcon = document.createElement("ul")
            // if(data.daily[i].temp.eve >= 80){
            //   searchResultIcon.innerText = "It's looking like a good day!"
            // } else if (data.daily[i].temp.eve < 80 && data.daily[i].temp.eve > 70){
            //   searchResultIcon.innerText = "You could probably Sun Bask"
            // } else {
            //   searchResultIcon.innerText = "could be better"
            // }

            var searchResultTemp = document.createElement("ul")
            searchResultTemp.innerText = data.daily[i].temp.eve

            var searchResultWind = document.createElement("ul")
            searchResultWind.innerText = data.daily[i].wind_speed + " mph winds"

            var searchResultHumidity = document.createElement("ul")
            searchResultHumidity.innerText = data.daily[i].humidity + "% Humidity"

            var searchResultWeather = document.createElement("img")
            searchResultWeather.classList.add("searchWeatherImg")
            
            if(data.daily[i].weather[0].main == "Clouds"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png"
            } else if (data.daily[i].weather[0].main == "Rain"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2017/01/29/11/09/rain-2017532_1280.png"
            }

            var searchResultCard = document.createElement("div")


            searchResultCard.classList.add("card")
            searchResultCard.classList.add("bg-dark")
            searchResultCard.classList.add("mx-2")
            searchResultCard.classList.add("text-white")


            searchForecastContainer.append(searchResultCard)
            searchResultCard.appendChild(searchResultDate)
            // searchResultCard.appendChild(searchResultIcon)
            searchResultCard.appendChild(searchResultTemp)
            searchResultCard.appendChild(searchResultWind)
            searchResultCard.appendChild(searchResultHumidity)
            searchResultCard.appendChild(searchResultWeather)
            
          }

          var searchInput = document.getElementById("citySearchInput").value; 
          var currentLocationEl = document.getElementById("currentLocation")
          var currentWeatherImg = document.createElement("img")
          currentWeatherImg.classList.add("currentWeatherImg")

          if(data.daily[0].weather[0].main == "Clouds"){
            currentWeatherImg.src = "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png"
          } else if (data.daily[0].weather[0].main == "Rain"){
            currentWeatherImg.src = "https://cdn.pixabay.com/photo/2017/01/29/11/09/rain-2017532_1280.png"
          }

          var currentTempEl = document.getElementById("currentTemp")
          var currentWindEl = document.getElementById("currentWind")
          var currentHumidityEl = document.getElementById("currentHumidity")
          var currentUVEl = document.getElementById("currentUV")

          currentLocationEl.innerHTML = searchInput + " " + moment.unix(data.daily[0].dt).format("dddd, MMMM Do YYYY")
          currentLocationEl.append(currentWeatherImg)
          currentTempEl.innerHTML = "Temp:" + currentTemp + " Degrees"
          currentWindEl.innerHTML = "Wind: " + currentWind + " MPH"
          currentHumidityEl.innerHTML = "Humidity: " + currentHumidity + " Percent Humidity"
          currentUVEl.innerHTML = "UV Index: " + currentUV

          if (currentUV <= 2){
            currentUVEl.classList.add("lowUV")
            console.log("The UV IS Low")
          } else if(currentUV > 2 && currentUV <= 5){
            console.log("The UV is Moderate")
            currentUVEl.classList.add("moderateUV")
          } else if(currentUV > 5 && currentUV <= 7){
            console.log("The UV is High")
            currentUVEl.classList.add("highUV")
          } else if(currentUV > 7 && currentUV <= 10){
            console.log("The UV is Very High")
            currentUVEl.classList.add("veryHighUV")
          } else if(currentUV > 10){
            console.log("The UV is Extreme")
            currentUVEl.classList.add("extremeUV")
          } 

        });

      }

      function clearsearchHistory(){
        searchForecastContainer.textContent = ""
      }



      searchBtn.addEventListener("click", function(){
        clearsearchHistory()
        searchInput = document.getElementById("citySearchInput").value;
        console.log(searchInput)
        getCity(searchInput);
      })

      function showRecentSearches(){
        recentSearches = JSON.parse(localStorage.getItem("searchInput"))
        recentSearches.forEach(function(item){
          var recentSearchLi = document.createElement("li")
          recentSearchLi.textContent = item.searchInput
          recentSearchesListEl.append(recentSearchLi)
        })
        console.log(localStorage)
      }

  



