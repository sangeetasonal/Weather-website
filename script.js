const apiKey = "23a313aec3f372ddb4428e21dc0b9538";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".not-found");
const weatherBar = document.querySelector(".weatherbar");
const enterLocationMessage = document.querySelector(".enter-location-message");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError();
    }
}

function displayWeather(data) {
    document.querySelector(".description").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = data.main.temp + "°c";
    document.querySelector(".info-humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".info-wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloud.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rainy") {
        weatherIcon.src = "images/rainy.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    weatherBar.style.display = "block";
    error.style.display = "none";
    enterLocationMessage.style.display = "none";
}

function displayError() {
    weatherBar.style.display = "none";
    error.style.display = "block";
    enterLocationMessage.style.display = "none";
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value === "") {
        enterLocationMessage.style.display = "block";
    } else {
        enterLocationMessage.style.display = "none";
        checkWeather(searchBox.value);
    }
});

// Listen for Enter key press
searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (searchBox.value === "") {
            enterLocationMessage.style.display = "block";
        } else {
            enterLocationMessage.style.display = "none";
            checkWeather(searchBox.value);
        }
    }
});
