var searchCity = document.getElementById("searchCity")
var searchBtn = document.getElementById("searchBtn")
var searchHist = document.getElementById("searchHistory")
var currentWeather = document.getElementById("currentWeather")
var forecastWeather = document.getElementById("forecast")
var cityList = document.getElementById("cityList")

var apiKey = "fcfd8f094c533b7224130fcd283eee7b";

var previousCities = [];

function displayPreviousCities() {

    cityList.innerHTML = "";

        for (var i = 0; i < cityHistory.length; i++) {
           var searchedCities = previousCities[i];
   
           var li = document.createElement('li');
           li.classList.add('custom-li')
           li.textContent = searchedCities;
           li.setAttribute('data-index', i);
           cityList.appendChild(li);   
       }
       
    cityList.addEventListener('click', function(event){     
        console.log(event)
        var element = event.target;
        
        if(element.matches('li') === true) {
            console.log(element.innerHTML)
            var cityHistory = element.innerHTML
            
            getAPI(cityHistory)
        }
    })

}