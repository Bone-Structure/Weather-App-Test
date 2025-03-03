function refreshWeather(response){
    let temperatureElement= document.querySelector("#temperature");
    let temperature= response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElelment = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time* 1000);

    cityElement.innerHTML=response.data.city;
    timeElement.innerHTML= formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`; 
    windSpeedElelment.innerHTML=`${response.data.wind.speed}m/hr`;
    temperatureElement.innerHTML = Math.round(temperature);
}
function formatDate(date){
   
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
 let day =days[date.getDay()];
 if (minutes<10){
    minutes= `0${minutes}`;
 }
    return `${days} ${hours}:${minutes}`;
}
function searchCity(city){
    let apiKey="3e7751ao608a0543f0ba87d742et2457";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Shanghai");