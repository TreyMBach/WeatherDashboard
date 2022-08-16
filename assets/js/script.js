
var apiKey = "20667418638774cf5af9135791e28d78"
var units = "imperial"
var cityLocation = "london";
var requestURL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityLocation + "&appid=" + apiKey;

searchBtn = document.getElementById("searchButton")
searchForecastContainer = document.getElementById("searchForecastContainer")



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
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
  
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
            searchResultDate.innerText = "Date"

            var test = 79

            var searchResultIcon = document.createElement("ul")
            if(test >= 80){
              searchResultIcon.innerText = "good"
            } else if (test < 80 && test > 70){
              searchResultIcon.innerText = "aight"
            } else {
              searchResultIcon.innerText = "could be better"
            }

            var searchResultTemp = document.createElement("ul")
            searchResultTemp.innerText = test

            var searchResultWind = document.createElement("ul")
            searchResultWind.innerText = data.wind.speed + " mph"

            var searchResultHumidity = document.createElement("ul")
            searchResultHumidity.innerText = data.main.humidity + "%"

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
            
          }


        });
      }

      searchBtn.addEventListener("click", function(){
        searchInput = document.getElementById("citySearchInput").value;
        console.log(searchInput)
        getCity(searchInput);
      })



