let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector('.weather_date_time');
let w_forecast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temperature = document.querySelector('.weather_temperature');
let w_min = document.querySelector('.weather_min');
let w_max = document.querySelector('.weather_max');


let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity'); 
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');

let citySearch = document.querySelector('.weather_search');

const getCountryName = (countryCode) => {
    return new Intl.DisplayNames(['en'], { type: "region" }).of(countryCode);
}

const getDataTime = (dt) => {
    const timeInMili = (dt * 1000);

    const options = {
        weekday : "long",
        year : "numeric",
        month: "long",
        day :"numeric",
        hour :"numeric",
        minute :"numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US" , options);
    return formatter.format(timeInMili);
}
let city = 'london';

citySearch.addEventListener('submit' , (e) => {
    e.preventDefault();

    let cityName = document.querySelector('.city_name');
    city = cityName.value ;
    getWeatherData();
    cityName.value = '';
})
const getWeatherData = async () => {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d779d68ab4d0ac851893cb60b0c6c2d7`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const { main, name, weather, wind, sys, dt } = data;
        cityName.textContent = `${name}, ${getCountryName(sys.country)}`;
        dateTime.textContent = getDataTime(dt);
        w_forecast.textContent = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png">`;
        w_temperature.innerHTML = `${(main.temp - 273 ).toFixed(1)} &#176`;
        w_min.innerHTML = `Min : ${(main.temp_min - 2743.15).toFixed(1)} &#176`;
        w_max.innerHTML = `Max : ${(main.temp_max - 273).toFixed(1)} &#176`;
        w_feelsLike.innerHTML = `${(main.feels_like - 273).toFixed(1)} &#176`;
        w_humidity.innerHTML = `${main.humidity} &#37; `
        w_wind.textContent = `${(wind.speed * 3.6).toFixed(2)} km/h` ;
        w_pressure.textContent = `${main.pressure} hPa`
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('load', getWeatherData());
