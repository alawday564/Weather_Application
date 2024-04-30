const apiKey = '655e7b267d7fa40c606eb10a3b108bc6';
const City = document.querySelector('.input_search');
const Weather_container = document.querySelector('.container_data');
const Weather_location = document.querySelector('.location_data');
const Weather_data = document.querySelector('.get_data');
const Weather_list_card = document.querySelector('.list_card');
const Custom_date = document.querySelector(".custom_date");
const Custom_day = document.querySelector(".custom_date");
const Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
//----------------------- Custom Day And Date -------------------//
const day = new Date();
const dayName = Days[day.getDay()];
Custom_day.textContent = dayName;

let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();
  
console.table();
Custom_date.textContent = dayName + " " + date + " " + month + " " + year + " "  ;

//------------------------------ Weather Details -----------------------//
function gettingWeatherDetails(cityWeather, lat, lon){
	const weather_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
	fetch(weather_API_URL).then(res=>res.json()).then(data=>{
		const forecastDays = [];
		const fiveDaysForecast = data.list.filter(function(forecast){
		const forecast_date = new Date(forecast.dt_txt).getDate();
		if(!forecastDays.includes(forecast_date))
		{
			return forecastDays.push(forecast_date);
		}});
		console.log(data);

		City.value = "";
		Weather_container.innerHTML = "";
		Weather_location.innerHTML ="";
		Weather_data.innerHTML ="";
		Weather_list_card.innerHTML = "";
		fiveDaysForecast.forEach(function(weatherItem,index){
			if(index === 0)
			{
				Weather_container.insertAdjacentHTML('beforeend',createWeatherCard(cityWeather, weatherItem, index));
			}
			else
			{
				Weather_list_card.insertAdjacentHTML('beforeend',createWeatherCard(cityWeather, weatherItem, index));
			}
		});
	}).catch(() =>{
		alert('Error',2000);
	});
}

//-------------------------- Create Weather Card -----------------------//
function createWeatherCard(cityName, weatherItem, index){
	const day = new Date(weatherItem.dt_txt);
	const dayName = Days[day.getDay()];
	const splitDay10 = dayName.split("", 10 );
	const splitDay3 = dayName.split("", 3 );
	const joinDay10 = splitDay10.join("");
	const joinDay3 = splitDay3.join("");
	if(index === 0) {
		return `
			<div class="location_data">
				<div class="location_content">
					<i class='bx bxs-map'></i>
					<h3>${cityName}</h3>
				</div>
				<p>${joinDay10} ${Custom_date.textContent = date + " " + month + " "}</p>
			</div>
			<div class="temperature">
				<h1>${(weatherItem.main.temp - 273.15).toFixed(0)}°</h1>
				<img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png"
						alt="temperature-image" class="temperature_img">
				<h2>${weatherItem.weather[0].description}</h2>
			</div>
			<div class="get_data">
				<div class="card_data">
					<i class='bx bx-water'></i>
					<small>${weatherItem.main.pressure} M/B</small>
					<span>Pressure</span>
				</div>
				<div class="card_data">
					<i class='bx bxs-droplet-half'></i>
					<small>${weatherItem.main.humidity}%</small>
					<span>Humidity</span>
				</div>
				<div class="card_data">
					<i class='bx bx-wind'></i>
					<small>${weatherItem.wind.speed} M/S</small>
					<span>wind Speed</span>
				</div>
			</div>
			<div class="Details">
                <a class="btn_details" href="sign_in.php">
                    <i class='bx bxs-chevrons-right bx-flashing'></i> View More
                </a>
            </div>
		`
	} else {
		return `
			<li class="swiper-slide list_card_data">
				<span>${joinDay3}</span>
				<img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" 
					alt="forecast-image" class="forecast_img">
				<div class="icon_overlay"></div>
				<small>
					${(weatherItem.main.temp - 273.15 + 5).toFixed(0)}°/
					${(weatherItem.main.temp - 273.15).toFixed(0)}°
				</small> 
			</li>
		`
	}
}