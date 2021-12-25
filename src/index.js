let now = new Date();
let currentDay = document.querySelector("#giorno");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

currentDay.innerHTML = `${day}`;

let currentHour = document.querySelector("#ora");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentHour.innerHTML = `${hour}:${minute}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempCelsius = document.querySelector(".temperature");
  tempCelsius.innerHTML = temperature;
  let currentCity = document.querySelector("#actual-city");
  currentCity.innerHTML = response.data.name;
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#citta-nuova");
  let currentCity = document.querySelector("#actual-city");
  currentCity.innerHTML = inputCity.value;
  let units = "metric";
  let apiKey = "41bc8aa28e75257d10555fa1b7bee77d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "41bc8aa28e75257d10555fa1b7bee77d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);
