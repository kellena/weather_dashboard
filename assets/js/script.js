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

searchEl.addEventListener('submit', function(event){
    console.log(event)
    event.preventDefault();
    var city = searchHist.value;

    getAPI(city);
 
    previousCities.push(city);
    searchHist.value = "";
 
    if(previousCities.length > 6) {
        previousCities.shift();
    }

    storeCities();
    getHistory();
});

function displayCurrentWeather(name, resultObject) {
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-dark', 'text-light', 'm-1', 'p-0'); 
    
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    var day = moment.unix(resultObject.daily[0].dt);
    titleEl.textContent = name + ' (' + day.format("M/D/YYYY") + ')'
    
    console.log(name);

    var iconEl = document.createElement('img');
    iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + resultObject.current.weather[0].icon + "@2x.png")

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = '<strong>Temperature:</strong> ' + resultObject.current.temp + ' °F' + '<br/>';
    bodyContentEl.innerHTML += '<strong>Humidity:</strong> ' + resultObject.current.humidity + "%"+ '<br/>';
    bodyContentEl.innerHTML += '<strong>Wind:</strong> ' + resultObject.current.wind_speed + " MPH"+ '<br/>';

    var uvText = document.createElement('p');
    var uvEl = document.createElement('span');
    var uvIndex = uvEl.textContent = resultObject.current.uvi
    uvText.innerHTML = "<strong>UV index:</strong> "
    uvText.append(uvEl)
    bodyContentEl.append(uvText)

    if (uvIndex < 3) {
        uvEl.classList.add('low-uv')
    } else if (uvIndex >= 3 && uvIndex < 8) {
        uvEl.classList.add('medium-uv')
    } else {
        uvEl.classList.add('high-uv')
    }

    resultBody.append(titleEl, iconEl, bodyContentEl);

    currentWeather.append(resultCard);
}

function displayForecastWeather(resultObject) {
    for (var i = 1; i < 6; i++) {
        var resultColumn = document.createElement('div');
        resultColumn.classList.add('col-md-2.5','m-auto');

        var resultCard = document.createElement('div');
        resultCard.classList.add('card', 'bg-dark', 'text-light',); 
        resultColumn.append(resultCard)

        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody)

        var titleEl = document.createElement('h4');
        var day = moment.unix(resultObject.daily[i].dt);
        titleEl.textContent = day.format("M/D/YYYY")

        var iconEl = document.createElement('img');
        iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + resultObject.daily[i].weather[0].icon + "@2x.png")

        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML = '<strong>Temperature:</strong> ' + resultObject.daily[i].temp.day + ' °F' + '<br/>';
        bodyContentEl.innerHTML += '<strong>Humidity:</strong> ' + resultObject.daily[i].humidity + "%"+ '<br/>';
        bodyContentEl.innerHTML += '<strong>Wind:</strong> ' + resultObject.daily[i].wind_speed + " MPH"+ '<br/>';
        resultBody.append(titleEl, iconEl, bodyContentEl);

        forecast.append(resultColumn)

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