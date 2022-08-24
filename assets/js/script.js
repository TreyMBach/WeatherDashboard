
var apiKey = "20667418638774cf5af9135791e28d78"
var units = "imperial"
var cityLocation = "london";
var requestURL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;
var recentSearches = []
var recentSearchesListEl = document.getElementById("recentSearchesList")

searchBtn = document.getElementById("searchButton")
searchForecastContainer = document.getElementById("searchForecastContainer")


// Fetch code for the weather api
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
      // Gets the api data based on the latitude and the longitude
      function getWeather(lat, lon){
        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&exclude=hourly,minutely,alerts`
  
        fetch(weatherUrl)
        .then(function (response) {
          console.log(response.status);
        
          return response.json();
        })
        .then(function (data) {
          console.log(data);


          // displays the date, an icon representation of weather conditions, the temperature, the wind speed, the humidity using a for loop
          for (let i = 1; i < 6; i++){  
    
            var searchResultDate = document.createElement("ul")
            searchResultDate.innerHTML = moment.unix(data.daily[i].dt).format("dddd, MMMM Do YYYY") 

            var currentTemp = data.current.temp
            var currentWind = data.current.wind_speed
            var currentHumidity = data.current.humidity
            var currentUV = data.daily[0].uvi


            // Creating elements for the temp, wind speed, humidity %, and weather image.
            var searchResultTemp = document.createElement("ul")
            searchResultTemp.innerText = data.daily[i].temp.eve

            var searchResultWind = document.createElement("ul")
            searchResultWind.innerText = data.daily[i].wind_speed + " mph winds"

            var searchResultHumidity = document.createElement("ul")
            searchResultHumidity.innerText = data.daily[i].humidity + "% Humidity"

            var searchResultWeather = document.createElement("img")
            searchResultWeather.classList.add("searchWeatherImg")
            
            //  Gives images based on the weather like clouds rain and clear sunshine
            if(data.daily[i].weather[0].main == "Clouds"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png"
            } else if (data.daily[i].weather[0].main == "Rain"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2017/01/29/11/09/rain-2017532_1280.png"
            } else if (data.daily[i].weather[0].main == "Clear"){
              searchResultWeather.src = "https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009__340.png"
            }

            var searchResultCard = document.createElement("div")


            searchResultCard.classList.add("card")
            searchResultCard.classList.add("bg-dark")
            searchResultCard.classList.add("mx-2")
            searchResultCard.classList.add("text-white")


            searchForecastContainer.append(searchResultCard)
            searchResultCard.appendChild(searchResultDate)
            searchResultCard.appendChild(searchResultTemp)
            searchResultCard.appendChild(searchResultWind)
            searchResultCard.appendChild(searchResultHumidity)
            searchResultCard.appendChild(searchResultWeather)
            
          }

          // Having the search input return the value
          var searchInput = document.getElementById("citySearchInput").value; 
          var currentLocationEl = document.getElementById("currentLocation")
          var currentWeatherImg = document.createElement("img")
          currentWeatherImg.classList.add("currentWeatherImg")

          // Gives the src for the weather for the current forecast
          if(data.daily[0].weather[0].main == "Clouds"){
            currentWeatherImg.src = "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png"
          } else if (data.daily[0].weather[0].main == "Rain"){
            currentWeatherImg.src = "https://cdn.pixabay.com/photo/2017/01/29/11/09/rain-2017532_1280.png"
          } else if (data.daily[0].weather[0].main == "Clear"){
            currentWeatherImg.src = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2505%2FPNG%2F512%2Fsunny_weather_icon_150663.png&imgrefurl=https%3A%2F%2Ficon-icons.com%2Ficon%2Fsunny-weather%2F150663&tbnid=1uoQQ_kPMSIPhM&vet=12ahUKEwjlxfir0NH5AhUPKjQIHTZZCSkQMygOegUIARDmAQ..i&docid=UYqDXbpaUJc5GM&w=512&h=512&q=clear%20weather%20icon&ved=2ahUKEwjlxfir0NH5AhUPKjQIHTZZCSkQMygOegUIARDmAQ"
          }

          var currentTempEl = document.getElementById("currentTemp")
          var currentWindEl = document.getElementById("currentWind")
          var currentHumidityEl = document.getElementById("currentHumidity")
          var currentUVEl = document.getElementById("currentUV")

          // Gives current day, and all current Temp, Wind speed, humidity levels, and current UV Level
          currentLocationEl.innerHTML = searchInput + " " + moment.unix(data.daily[0].dt).format("dddd, MMMM Do YYYY")
          currentLocationEl.append(currentWeatherImg)
          currentTempEl.innerHTML = "Temp:" + currentTemp + " Degrees"
          currentWindEl.innerHTML = "Wind: " + currentWind + " MPH"
          currentHumidityEl.innerHTML = "Humidity: " + currentHumidity + " Percent Humidity"
          currentUVEl.innerHTML = "UV Index: " + currentUV

          // Adds certain class for the current UV to be able to change the color.
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

      // Resets the search history.
      function clearsearchHistory(){
        searchForecastContainer.textContent = ""
      }


      // saves the recent searches based on the local storage.
      function saveRecentSearches(){
        searchInput = document.getElementById("citySearchInput").value;
        localStorage.setItem("searchInput", searchInput)
        recentSearches.push(localStorage.getItem("searchInput"))
        console.log(localStorage)
        localStorage.setItem("recentSearches", recentSearches)
      }

      // SHows the results from the search input
      searchBtn.addEventListener("click", function(){
        clearsearchHistory()
        saveRecentSearches()
        searchInput = document.getElementById("citySearchInput").value;
        console.log(searchInput)
        getCity(searchInput);
        showRecentSearches()
      })

      // Shows the recent searches
      function showRecentSearches(){
        console.log(recentSearches)
        recentSearchesListEl.innerHTML = ''
        for(var i = 0; i < recentSearches.length; i++){
          console.log(recentSearches[i])
          var recentSearchButton = document.createElement("button")

          recentSearchButton.innerHTML = recentSearches[i]
          
          recentSearchesListEl.append(recentSearchButton)

          recentSearchButton.addEventListener("click", function(){
            clearsearchHistory();
            getCity("London", geocodeUrl);
          })
        }
       }

       showRecentSearches()

  



