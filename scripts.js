window.addEventListener("load", getDefaultClimate)
const infoDisplay = document.getElementsByClassName('info');

//this functions if called when loading the page to show the default location data. I'm using La Plata as default city
function getDefaultClimate() {
    getClimateData("la plata")
}

async function getClimateData(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2206b921b0c249c9bc7144329230905&q=${city}&lang=es`, {mode: 'cors'})
    const data = await response.json();

    displayData(data);
    console.log(data)
    console.log(data.current.condition.text)
    console.log(data.current.temp_c)
    console.log(data.location.name)
    console.log(data.location.country)
    console.log(data.current.feelslike_c)
    console.log(data.current.humidity)
    console.log(data.current.wind_kph)
    
}

function displayData(wheatherData) {
    const description = document.getElementById('description')
    description.innerText = wheatherData.current.condition.text;
    const location = document.getElementById('location');
    location.innerText = `${wheatherData.location.name}, ${wheatherData.location.country}`;
    const temp = document.getElementById('temp');
    temp.innerText = `${wheatherData.current.temp_c}°`;
    const feelslike = document.getElementById('feelslike');
    feelslike.innerText = `Sensación térmica: ${wheatherData.current.feelslike_c}°`;
    const humidity = document.getElementById('humidity');
    humidity.innerText = `Humedad: ${wheatherData.current.humidity}%`;
    const wind = document.getElementById('wind');
    wind.innerText = `Viento: ${wheatherData.current.wind_kph} km/h`;
}