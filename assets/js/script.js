var searchCity = document.getElementById("searchCity")
var searchBtn = document.getElementById("searchBtn")
var searchHist = document.getElementById("searchHistory")
var currentWeather = document.getElementById("currentWeather")
var forecastWeather = document.getElementById("forecast")
var cityList = document.getElementById("cityList")

var previousCities = [];

function displayPreviousCities() {

    cityList.innerHTML = "";

        for (var i = 0; i < previousCities.length; i++) {
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
            var previousCities = element.innerHTML
            
            getAPI(previousCities)
        }
    })

}

function getHistory() {
    var storedCities = JSON.parse(localStorage.getItem('previousCities'))
     
    if(storedCities !== null) {
        previousCities = storedCities
    }

    displayPreviousCities();
}

function storeCities() {
    localStorage.setItem('previousCities', JSON.stringify(previousCities));
}

function displayCurrentWeather(name, resultObject) {
    // display today's forecast
}

function displayForecastWeather(resultObject) {
    // display five-day forecast
}



function getAPI(cityID) {
    var key = 'fcfd8f094c533b7224130fcd283eee7b';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID+ '&units=imperial&&appid=' + key)
    .then(function(response){return response.json()}) 
    .then(function(data) {
        console.log(data)
        getWeatherAPI(data.name ,data.coord.lat, data.coord.lon)
    }) 
}

function getWeatherAPI(name, lat, lon) {
    var key = 'fcfd8f094c533b7224130fcd283eee7b';
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + key)
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data)
        currentWeather.textContent = '';
        forecast.textContent = '';
        displayCurrentWeather(name, data)
        displayForecastWeather(data)
    })
}