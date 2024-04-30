//---------------------------------- Enter --------------------------------- 
var input = document.getElementById("input_search_id");
	input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("btn_search_id").click();
	}
});

//---------------------------------- Button Search --------------------------------- 
const APIKey = '655e7b267d7fa40c606eb10a3b108bc6';
const btn_search = document.querySelector('.btn_search');

btn_search.addEventListener('click',function(){
	const cityName = City.value.trim();
	if(cityName == "")
		{
			alert("Please enter the city name",2000);
			return ;
		}
	else {
		const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`;
		fetch(API_URL).then(res =>res.json()).then(data=>{
			if(!data.length) 
			{
				return alert(`${cityName} : Invalid City Name`,2000);
			}
			else
			{
				const { name,lat,lon } = data[0]; 
				gettingWeatherDetails(name,lat, lon);
			}  			
		}).catch(()=>{
			alert("Error",2000);
		})
	}
});

const initApp = () => {
    City.value = 'Thành phố Hồ Chí Minh';
    cityName();
}
initApp();