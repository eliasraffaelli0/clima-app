window.addEventListener("load", getDefaultClimate)
const infoDisplay = document.getElementsByClassName('info');
const form = document.querySelector('form');
form.addEventListener('submit', fetchUserInput)

// this functions if called when loading the page to show the default location data. I'm using La Plata as default city
function getDefaultClimate() {
    getClimateData("la plata")
}

async function getClimateData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2206b921b0c249c9bc7144329230905&q=${city}&lang=es`, {mode: 'cors'})
        console.log(response.status);
        const data = await response.json();
    
        displayData(data);
    } catch(error) {
        console.log(error)
    }
}

function displayData(wheatherData) {
    //this section change the background image if it's night time on the current location
    let time = new Date(wheatherData.location.localtime);
    time = time.getHours();
    changeTheme(time);

    //updates the data displayed for the current location
    document.getElementById('description').innerText = wheatherData.current.condition.text;
    document.getElementById('location').innerText = `${wheatherData.location.name}, ${wheatherData.location.country}`;
    document.getElementById('temp').innerText = `${wheatherData.current.temp_c}°`;
    document.getElementById('feelslike').innerText = `Sensación térmica: ${wheatherData.current.feelslike_c}°`;
    document.getElementById('humidity').innerText = `Humedad: ${wheatherData.current.humidity}%`;
    document.getElementById('wind').innerText = `Viento: ${wheatherData.current.wind_kph} km/h`;
}

//change the background image if it's night time on the current location
function changeTheme(time) {
    const bgimg = document.getElementById('bg-img');
    if(time > 19 || time < 7){
        bgimg.style.backgroundImage = 'url(./public/tree-736877.jpg)';
        document.body.style.color = 'white';
    } else {
        bgimg.style.backgroundImage = 'url(./public/pexels-photo-2114014.jpeg)';
        document.body.style.color = 'black';
    }
}

function fetchUserInput(e) {
    e.preventDefault();
    const input = document.getElementById('user-input').value;
    getClimateData(input);
}