const btn_search = document.querySelector('.btn_search');
const City = document.querySelector('.input_search');
const apiKey = '655e7b267d7fa40c606eb10a3b108bc6';
const Weather_container = document.querySelector('.container_data');
const Weather_location = document.querySelector('.location_data');
const Weather_data = document.querySelector('.get_data');
const Weather_list_card = document.querySelector('.list_card');
const Weather_start = document.querySelector('.btn_started');

const Custom_date = document.querySelector(".custom_date");
const Custom_day = document.querySelector(".custom_date");
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
  ];
  
  // display the day
  const day = new Date();
  const dayName = days[day.getDay()];
  Custom_day.textContent = dayName;
  
  // display date
  let month = day.toLocaleString("default", { month: "long" });
  let date = day.getDate();
  let year = day.getFullYear();
  
  console.log();
  Custom_date.textContent = date + " " + month + " " + year;
  
Weather_start.addEventListener('click',function(){
	document.querySelector('.home_page').classList.add('active');
	document.querySelector('.container').classList.add('active');
})

//creating a function named gettingWeatherDetails
function gettingWeatherDetails(cityWeather, lat, lon){
	const weather_api_url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
	fetch(weather_api_url).then(res=>res.json()).then(data=>{
		const forecastDays = [];
		const fiveDaysForecast = data.list.filter(function(forecast){
		const forecast_date = new Date(forecast.dt_txt).getDate();
		if(!forecastDays.includes(forecast_date))
		{
			return forecastDays.push(forecast_date);
		}});
		console.log(data);

		//when weather is fetched the HTML elements is removed and new will be added
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

// creating a function named createWeatherCard
function createWeatherCard(cityName, weatherItem, index){
	const day = new Date(weatherItem.dt_txt);
	const dayName = days[day.getDay()];
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
				<p>${joinDay10} ${Custom_date.textContent = "," + date + " " + month + " "}</p>
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

//---------------------------------- Search --------------------------------- 
btn_search.addEventListener('click',function(){
	const cityName = City.value.trim();//trim to remove extra spaces
	if(cityName == "")
		{
			alert("Please enter the city name",2000);
			return ;
		}
	else {
		const geocoding_api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
		fetch(geocoding_api_url).then(res =>res.json()).then(data=>{
			if(!data.length) //if you enter wrong keyword or city name
			{
				return alert(`${cityName} : Invalid City Name`,2000);
			}
			else
			{
				const { name,lat,lon } = data[0]; //storing the value of Name,latitute and value of longitude in data array
				gettingWeatherDetails(name, lat, lon);//Now We have to create a function named gettingWeatherDetails
			}  			
		}).catch(()=>{
			alert("Error",2000);
		})
	}
});