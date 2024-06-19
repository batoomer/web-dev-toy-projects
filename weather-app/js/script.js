const searchButton = document.querySelector('.search-bar .btn');
const cityInput = document.getElementById('city-input');

searchButton.addEventListener('click', async function() {
    const city = cityInput.value;
    await updateWeather(city);
});

window.addEventListener('load', async () => {
    await updateWeather('Athens');
});

async function updateWeather(city) {
    try {
        const data = await fetchData(city);
        const appData = parseData(data);
        updateUI(appData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        // Display an error message in the UI if needed
    }
}

async function fetchData(city) {
    const apiKey = 'e74144e59c65482e933203015240504';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=yes`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return await response.json();
}

function parseData(data) {
    return {
        'current': {
            'weather': `${data.current.temp_c}°C, ${data.current.condition.text}`,
            'icon': data.current.condition.icon,
            'location': `${data.location.name}, ${data.location.country}`,
            'wind-speed': `${data.current.wind_kph} km/h`,
            'humidity': `${data.current.humidity}%`,
            'uv': data.current.uv,
            'sunrise': `${data.forecast.forecastday[0].astro.sunrise}`,
            'sunset': `${data.forecast.forecastday[0].astro.sunset}`
        },
        'forecast': {
            'today': {
                'weather': `${data.forecast.forecastday[0].day.avgtemp_c}, ${data.forecast.forecastday[0].day.condition.text}`,
                'icon': `${data.forecast.forecastday[0].day.condition.icon}`,
                'uv': `${data.forecast.forecastday[0].day.uv}`,
                'humidity': `${data.forecast.forecastday[0].day.avghumidity}%`
            },
            'tomorrow': {
                'weather': `${data.forecast.forecastday[1].day.avgtemp_c}, ${data.forecast.forecastday[1].day.condition.text}`,
                'icon': `${data.forecast.forecastday[1].day.condition.icon}`,
                'uv': data.forecast.forecastday[1].day.uv,
                'humidity': `${data.forecast.forecastday[1].day.avghumidity}%`
            },
            'overmorrow': {
                'weather': `${data.forecast.forecastday[2].day.avgtemp_c}, ${data.forecast.forecastday[2].day.condition.text}`,
                'icon': `${data.forecast.forecastday[2].day.condition.icon}`,
                'uv': data.forecast.forecastday[2].day.uv,
                'humidity': `${data.forecast.forecastday[2].day.avghumidity}%`
            }
        }
    };
}

function updateUI(appData) {
    updateCurrentCardUI(appData.current);
    updateDayCard('today', appData.forecast);
    updateDayCard('tomorrow', appData.forecast);
    updateDayCard('overmorrow', appData.forecast);
}

function updateCurrentCardUI(data) {
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    document.getElementById('city-name').textContent = data.location;
    document.getElementById('current-temperature').textContent = data.weather;
    document.getElementById('current-weather-icon').src = data.icon;
    document.getElementById('current-wind-speed').textContent = data['wind-speed'];
    document.getElementById('current-humidity').textContent = data.humidity;
    document.getElementById('current-uv-index').textContent = data.uv;
}

function updateDayCard(day, data) {
    document.getElementById(`${day}-temperature`).textContent = data[day].weather;
    document.getElementById(`${day}-weather-icon`).src = data[day].icon;
    document.getElementById(`${day}-uv`).textContent = data[day].uv;
    document.getElementById(`${day}-humidity`).textContent = data[day].humidity;
}
