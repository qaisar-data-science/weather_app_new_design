const overlay = document.getElementById("overlay");
overlay.style.opacity = '0';

const weatherCard = document.getElementById("weatherCard");
weatherCard.style.opacity = '0';

// const weeklyCard = document.getElementById("weekly-report");
// weeklyCard.style.opacity = '0';




function openAlert() {
    overlay.style.display = "block";
    overlay.style.opacity = '1';
}

function closeAlert() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    location.reload();
}

function fetchWeather() {
    var apiKey = 'a1cbe27a90d169fa3952e3f02732a49a';
    var city = document.getElementById("cityInput").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }

            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = data.name;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.getElementById("temperature").textContent = data.main.temp + "°C";
            document.getElementById("weatherDescription").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = data.main.humidity + "%";
            document.getElementById("wind").textContent = data.wind.speed + " m/s";
            weatherCard.style.display = 'block';
            setTimeout(() => {
            weatherCard.style.opacity = '1'; 
            }, 10);

            // weeklyCard.style.display = 'block';
            // setTimeout(() => {
            // weeklyCard.style.opacity = '1';
            // }, 10);

            overlay.style.display = 'none';
            overlay.style.opacity = '0';
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const hour = document.getElementById("time").textContent = hours;
            const minute = document.getElementById("time2").textContent = minutes;
        })
        .catch(error => {
            openAlert();
            weatherCard.style.display = 'none';
            weeklyCard.style.display = 'none';
        });
}


document.getElementById("searchButton").addEventListener("click", fetchWeather);
