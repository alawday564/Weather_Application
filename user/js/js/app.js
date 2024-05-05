const temp = document.getElementById("temp"),
  date = document.getElementById("date-time"),
  condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  snow = document.getElementById("snow"),
  dew = document.getElementById("dew"),
  mainIcon = document.getElementById("icon"),
  currentLocation = document.getElementById("location"),
  uvIndex = document.querySelector(".uv-index"),
  uvStatus = document.querySelector(".uv-status"),
  uvIconText = document.querySelector(".uv-icon-text"),
  uvText = document.querySelector(".uv-text"),
  windSpeed = document.querySelector(".wind-speed"),
  windStatus = document.querySelector(".wind_status"),
  windIconText = document.querySelector(".wind_icon_text"),
  windText = document.querySelector(".wind_text"),
  sunRise = document.querySelector(".sun-rise"),
  sunSet = document.querySelector(".sun-set"),
  humidity = document.querySelector(".humidity"),
  humidityText = document.querySelector(".humidity_text"),
  humidityStatus = document.querySelector(".humidity_status"),
  humidityIconText = document.querySelector(".humidity_icon_text"),
  visibility = document.querySelector(".visibility"),
  visibilityText = document.querySelector(".visibility_text"),
  visibilityIconText = document.querySelector(".visibility_icon_text"),
  visibilityStatus = document.querySelector(".visibility_status"),
  pressure = document.querySelector(".pressure"),
  pressureText = document.querySelector(".pressure_text"),
  pressureIconText = document.querySelector(".pressure_icon_text"),
  pressureStatus = document.querySelector(".pressure_status"),
  windgust = document.querySelector(".windguste"),
  windgustText = document.querySelector(".windgust_text"),
  windgustIconText = document.querySelector(".windgust_icon_text"),
  windgustStatus = document.querySelector(".windgust_status"),
  moonphase = document.querySelector(".moonphase"),
  moonphaseText = document.querySelector(".moonphase_text"),
  moonphaseIconText = document.querySelector(".moonphase_icon_text"),
  moonphaseStatus = document.querySelector(".moonphase_status"),
  airQuality = document.querySelector(".air-quality"),
  airQualityText = document.querySelector(".air_text"),
  airQualityStatus = document.querySelector(".air_status"),
  airQualityIconText = document.querySelector(".air_icon_text"),
  searchForm = document.querySelector("#search"),
  search = document.querySelector("#query"),
  celciusBtn = document.querySelector(".celcius"),
  fahrenheitBtn = document.querySelector(".fahrenheit"),
  tempUnit = document.querySelectorAll(".temp-unit"),
  hourlyBtn = document.querySelector(".hourly"),
  weekBtn = document.querySelector(".week"),
  weatherCards = document.querySelector("#weather-cards"),
  Feels_like = document.querySelector(".feelslike"),
  FeelText = document.querySelector(".feelslike_text"),
  FeelIconText = document.querySelector(".feelslike_icon_text"),
  FeelStatus = document.querySelector(".feelslike_status");



let city2 = document.querySelector('.location');

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "week";

// function to get date and time
function getDateTime() {
  let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // 12 hours format
  hour = hour % 12;
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}

//Updating date and time
date.innerText = getDateTime();
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);

// function to get public ip address
function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .then((data) => {
      currentCity = data.city;
      getWeatherData(data.city, currentUnit, hourlyorWeek);
    })
    .catch((err) => {
      console.error(err);
    });
}

getPublicIp();

// function to get weather data
function getWeatherData(city, unit, hourlyorWeek) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let today = data.currentConditions;
      let days = data.days[0];
      if (unit === "c") {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celciusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.conditions;
      rain.innerText = "Perc : " + days.precip + "%";
      snow.innerText = "Snow : " + today.snow + "°";
      dew.innerText = "Dew : " + today.dew + "°";
      uvIndex.innerText = today.uvindex;
      update_UVindex(today.uvindex);
      windSpeed.innerText = today.windspeed;
      update_Wind(today.windspeed);
      windgust.innerText = today.windgust;
      update_Windgust(today.windgust);
      moonphase.innerText = today.moonphase;
      update_Moonphase(today.moonphase);
      mainIcon.src = getIcon(today.icon);
      changeBackground(today.icon);
      humidity.innerText = today.humidity;
      update_Humidity(today.humidity);
      visibility.innerText = today.visibility;
      update_visibility(today.visibility);
      pressure.innerText = today.pressure;
      update_pressure(today.pressure);
      airQuality.innerText = today.winddir;
      update_Air_Quality(today.winddir);
      Feels_like.innerText = today.feelslike + "°";
      update_Feels_like(today.feelslike);

      if (hourlyorWeek === "hourly") {
        updateForecast(data.days[0].hours, unit, "day");
      } else {
        updateForecast(data.days, unit, "week");
      }
      sunRise.innerText = covertTimeTo12HourFormat(today.sunrise);
      sunSet.innerText = covertTimeTo12HourFormat(today.sunset);
    })
    .catch((err) => {
      // alert("Invalid City Name",2000);
    })
};

//function to update Forecast
function updateForecast(data, unit, type) {
  weatherCards.innerHTML = "";
  let day = 0;
  let numCards = 0;
  if (type === "day") {
    numCards = 24;
  } else {
    numCards = 7;
  }
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let dayName = getHour(data[day].datetime);
    if (type === "week") {
      dayName = getDayName(data[day].datetime);
    }
    let dayTemp = data[day].temp;
    if (unit === "f") {
      dayTemp = celciusToFahrenheit(data[day].temp);
    }
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = "°C";
    if (unit === "f") {
      tempUnit = "°F";
    }
    card.innerHTML = `
            <ul class="slider-list" id="weather-cards">
                <li class="slider-item">
                    <div class="card card-sm slider-card">
                        <p class="body-3">${dayName}</p>
                        <img src="${iconSrc}" width="48" height="48" 
                            alt="" loading="lazy" class="weather-icon" title="">
                        <p class="body-3">${dayTemp}${tempUnit}</p>
                    </div>
                </li>
            </ul>
  `;
    weatherCards.appendChild(card);
    day++;
  }
}

// function to change weather icons
function getIcon(condition) {
  if (condition === "partly-cloudy-day") {
    return "https://i.ibb.co/PZQXH8V/27.png";
  } else if (condition === "partly-cloudy-night") {
    return "https://i.ibb.co/Kzkk59k/15.png";
  } else if (condition === "rain") {
    return "https://i.ibb.co/kBd2NTS/39.png";
  } else if (condition === "clear-day") {
    return "https://i.ibb.co/rb4rrJL/26.png";
  } else if (condition === "clear-night") {
    return "https://i.ibb.co/1nxNGHL/10.png";
  } else {
    return "https://i.ibb.co/rb4rrJL/26.png";
  }
}

// function to change background depending on weather conditions
function changeBackground(condition) {
  const body = document.querySelector("body");
  let bg = "";
  if (condition === "partly-cloudy-day") {
    bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
  } else if (condition === "partly-cloudy-night") {
    bg = "https://i.ibb.co/RDfPqXz/pcn.jpg";
  } else if (condition === "rain") {
    bg = "https://i.ibb.co/h2p6Yhd/rain.webp";
  } else if (condition === "clear-day") {
    bg = "https://i.ibb.co/WGry01m/cd.jpg";
  } else if (condition === "clear-night") {
    bg = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
  } else {
    bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
  }
  body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
}

//get hours from hh:mm:ss
function getHour(time) {
  let hour = time.split(":")[0];
  let min = time.split(":")[1];
  if (hour > 12) {
    hour = hour - 12;
    return `${hour}:${min} PM`;
  } else {
    return `${hour}:${min} AM`;
  }
}

// convert time to 12 hour format
function covertTimeTo12HourFormat(time) {
  let hour = time.split(":")[0];
  let minute = time.split(":")[1];
  let am_pm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  let strTime = hour + ":" + minute + " " + am_pm;
  return strTime;
}

// function to get day name from date
function getDayName(date) {
  let day = new Date(date);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day.getDay()];
}

// function to get Wind
function update_Wind(windSpeed) {
  if (windSpeed <= 6) {
    windStatus.innerText = "😆";
    windText.innerText = "Tranquility";
    windIconText.innerText = "💚";
  } else if (windSpeed <= 19) {
    windStatus.innerText = "😐";
    windText.innerText = "Light breeze";
    windIconText.innerText = "💛";
  } else if (windSpeed <= 30) {
    windStatus.innerText = "😷";
    windText.innerText = "Moderate breeze";
    windIconText.innerText = "🧡";
  } else if (windSpeed <= 39) {
    windStatus.innerText = "🤢";
    windText.innerText = "Fresh breeze";
    windIconText.innerText = "❤️";
  } else {
    windStatus.innerText = "🥵";
    windText.innerText = "Strong breeze";
    windIconText.innerText = "💜";
  }
}

// function to get uv index status
function update_UVindex(uvIndex) {
  if (uvIndex <= 2) {
    uvStatus.innerText = "😆";
    uvText.innerText = "Low";
    uvIconText.innerText = "💚";
  } else if (uvIndex <= 5) {
    uvStatus.innerText = "😐";
    uvText.innerText = "Moderate";
    uvIconText.innerText = "💛";
  } else if (uvIndex <= 7) {
    uvStatus.innerText = "😷";
    uvText.innerText = "High";
    uvIconText.innerText = "🧡";
  } else if (uvIndex <= 10) {
    uvStatus.innerText = "🤢";
    uvText.innerText = "Very High";
    uvIconText.innerText = "❤️";
  } else {
    uvStatus.innerText = "🥵";
    uvText.innerText = "Extreme";
    uvIconText.innerText = "💜";
  }
}

// function to get humidity status
function update_Humidity(humidity) {
  if (humidity <= 30) {
    humidityStatus.innerText = "😆"
    humidityText.innerText = "Relative";
    humidityIconText.innerText = "💛";
  } else if (humidity <= 80) {
    humidityStatus.innerText = "😆"
    humidityText.innerText = "Absolute";
    humidityIconText.innerText = "💚";
  } else {
    humidityStatus.innerText = "😷"
    humidityText.innerText = "Maxima";
    humidityIconText.innerText = "🧡";
  }
}

//function to get presure
function update_pressure(pressure) {
  if (pressure <= 900) {
    pressureStatus.innerText = "😐"
    pressureText.innerText = "Low";
    pressureIconText.innerText = "💛";
  } else if (pressure <= 1000) {
    pressureStatus.innerText = "😆"
    pressureText.innerText = "Moderate";
    pressureIconText.innerText = "💚";
  } else {
    pressureStatus.innerText = "😆"
    pressureText.innerText = "High";
    pressureIconText.innerText = "🧡";
  }
}

// function to get visibility status
function update_visibility(visibility) {
  if (visibility <= 0.03) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Dense Fog";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 0.16) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Moderate Fog";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 0.35) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Light Fog";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 1.13) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Very Light Fog";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 2.16) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Light Mist";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 5.4) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Very Light Mist";
    visibilityIconText.innerText = "💚";
  } else if (visibility <= 10.8) {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Clear Air";
    visibilityIconText.innerText = "💚";
  } else {
    visibilityStatus.innerText = "😆";
    visibilityText.innerText = "Very Clear Air";
    visibilityIconText.innerText = "💚";
  }
}

// function to get air quality status
function update_Air_Quality(airquality) {
  if (airquality <= 30) {
    airQualityStatus.innerText = "😆";
    airQualityText.innerText = "Good";
    airQualityIconText.innerText = "💚";
  } else if (airquality <= 60) {
    airQualityStatus.innerText = "😐";
    airQualityText.innerText = "Qualified";
    airQualityIconText.innerText = "💚";
  } else if (airquality <= 90) {
    airQualityStatus.innerText = "😷";
    airQualityText.innerText = "Moderate Pollution";
    airQualityIconText.innerText = "💚";
  } else if (airquality <= 120) {
    airQualityStatus.innerText = "😨";
    airQualityText.innerText = "Least";
    airQualityIconText.innerText = "💚";
  } else if (airquality <= 250) {
    airQualityStatus.innerText = "🤢";
    airQualityText.innerText = "Very Poor";
    airQualityIconText.innerText = "💚";
  } else {
    airQualityStatus.innerText = "🥵";
    airQualityText.innerText = "Danger";
  }
}

// function to get feels like
function update_Feels_like(Feels_like) {
  if (Feels_like <= 30) {
    FeelText.innerText = "Low";
  } else if (Feels_like <= 60) {
    FeelText.innerText = "Moderate";
  } else {
    FeelText.innerText = "High";
  }
}

// function to handle search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value.trim();
  if (location) {
    currentCity = location;
    getWeatherData(location, currentUnit, hourlyorWeek);
  }
});

// function to conver celcius to fahrenheit
function celciusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}


var currentFocus;
search.addEventListener("input", function (e) {
  removeSuggestions();
  var a, b, i, val = this.value.trim();
  if (!val) {
    return false;
  }
  currentFocus = -1;

  a = document.createElement("ul");
  a.setAttribute("id", "suggestions");
  this.parentNode.appendChild(a);

  for (i = 0; i < cities.length; i++) {
    if (
      cities[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
    ) {
      b = document.createElement("li");
      b.innerHTML = "<strong>" + cities[i].name.substr(0, val.length) + "</strong>";
      b.innerHTML += cities[i].name.substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + cities[i].name + "'>";
      b.addEventListener("click", function (e) {
        search.value = this.getElementsByTagName("input")[0].value;
        removeSuggestions();
      });
      a.appendChild(b);
    }
  }
});
//---------------------- Top Bot --------------------------
search.addEventListener("keydown", function (e) {
  var x = document.getElementById("suggestions");
  if (x) x = x.getElementsByTagName("li");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(x);
  }
});
function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("active");
}
function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}

function removeSuggestions() {
  var x = document.getElementById("suggestions");
  if (x) x.parentNode.removeChild(x);
}

fahrenheitBtn.addEventListener("click", () => {
  changeUnit("f");
});
celciusBtn.addEventListener("click", () => {
  changeUnit("c");
});

// function to change unit
function changeUnit(unit) {
  if (currentUnit !== unit) {
    currentUnit = unit;
    tempUnit.forEach((elem) => {
      elem.innerText = `°${unit.toUpperCase()}`;
    });
    if (unit === "c") {
      celciusBtn.classList.add("active");
      fahrenheitBtn.classList.remove("active");
    } else {
      celciusBtn.classList.remove("active");
      fahrenheitBtn.classList.add("active");
    }
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}

hourlyBtn.addEventListener("click", () => {
  changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});

// function to change hourly to weekly or vice versa
function changeTimeSpan(unit) {
  if (hourlyorWeek !== unit) {
    hourlyorWeek = unit;
    if (unit === "hourly") {
      hourlyBtn.classList.add("active");
      weekBtn.classList.remove("active");
    } else {
      hourlyBtn.classList.remove("active");
      weekBtn.classList.add("active");
    }
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}


// Cities add your own to get in search

cities = [
  {
    "country": "Việt Nam",
    "name": "Hà Nội",
    "lat": "21.0285",
    "lng": "105.8542"
  },
  {
    "country": "Việt Nam",
    "name": "Hồ Chí Minh",
    "lat": "10.8231",
    "lng": "106.6297"
  },
  {
    "country": "Việt Nam",
    "name": "Đà Nẵng",
    "lat": "16.0544",
    "lng": "108.2022"
  },
  {
    "country": "Việt Nam",
    "name": "Hải Phòng",
    "lat": "20.861",
    "lng": "106.679"
  },
  {
    "country": "Việt Nam",
    "name": "Cần Thơ",
    "lat": "10.0455",
    "lng": "105.7469"
  },
  {
    "country": "Việt Nam",
    "name": "Nha Trang",
    "lat": "12.2388",
    "lng": "109.1966"
  },
  {
    "country": "Việt Nam",
    "name": "Huế",
    "lat": "16.463",
    "lng": "107.5847"
  },
  {
    "country": "Việt Nam",
    "name": "Vũng Tàu",
    "lat": "10.346",
    "lng": "107.0843"
  },
  {
    "country": "Việt Nam",
    "name": "Biên Hòa",
    "lat": "10.9447",
    "lng": "106.8243"
  },
  {
    "country": "Việt Nam",
    "name": "Hạ Long",
    "lat": "20.9517",
    "lng": "107.0807"
  },
  //HN
  {
    "country": "Việt Nam",
    "name": "Ba Đình",
    "lat": "21.0342",
    "lng": "105.8149"
  },
  {
    "country": "Việt Nam",
    "name": "Hoàn Kiếm",
    "lat": "21.0286",
    "lng": "105.8507"
  },
  {
    "country": "Việt Nam",
    "name": "Tây Hồ",
    "lat": "21.0707",
    "lng": "105.8213"
  },
  {
    "country": "Việt Nam",
    "name": "Long Biên",
    "lat": "21.0479",
    "lng": "105.8804"
  },
  {
    "country": "Việt Nam",
    "name": "Cầu Giấy",
    "lat": "21.0357",
    "lng": "105.8016"
  },
  {
    "country": "Việt Nam",
    "name": "Đống Đa",
    "lat": "21.0122",
    "lng": "105.827"
  },
  {
    "country": "Việt Nam",
    "name": "Hai Bà Trưng",
    "lat": "21.0085",
    "lng": "105.8507"
  },
  {
    "country": "Việt Nam",
    "name": "Hoàng Mai",
    "lat": "20.967",
    "lng": "105.855"
  },
  {
    "country": "Việt Nam",
    "name": "Thanh Xuân",
    "lat": "20.9935",
    "lng": "105.8124"
  },
  {
    "country": "Việt Nam",
    "name": "Nam Từ Liêm",
    "lat": "21.0049",
    "lng": "105.7651"
  },
  {
    "country": "Việt Nam",
    "name": "Bắc Từ Liêm",
    "lat": "21.073",
    "lng": "105.7543"
  },
  {
    "country": "Việt Nam",
    "name": "Hà Đông",
    "lat": "20.9711",
    "lng": "105.7753"
  },
  {
    "country": "Việt Nam",
    "name": "Sóc Sơn",
    "lat": "21.2723",
    "lng": "105.9085"
  },
  {
    "country": "Việt Nam",
    "name": "Đông Anh",
    "lat": "21.1378",
    "lng": "105.8006"
  },
  {
    "country": "Việt Nam",
    "name": "Gia Lâm",
    "lat": "21.0285",
    "lng": "105.9523"
  },
  {
    "country": "Việt Nam",
    "name": "Thanh Trì",
    "lat": "20.8585",
    "lng": "105.8672"
  },
  {
    "country": "Việt Nam",
    "name": "Mê Linh",
    "lat": "21.1676",
    "lng": "105.7527"
  },
  {
    "country": "Việt Nam",
    "name": "Hà Nam",
    "lat": "20.825",
    "lng": "105.9248"
  },
  {
    "country": "Việt Nam",
    "name": "Đan Phượng",
    "lat": "21.1004",
    "lng": "105.6967"
  },
  {
    "country": "Việt Nam",
    "name": "Hoài Đức",
    "lat": "21.0405",
    "lng": "105.4989"
  },
  {
    "country": "Việt Nam",
    "name": "Quốc Oai",
    "lat": "20.9918",
    "lng": "105.569"
  },
  {
    "country": "Việt Nam",
    "name": "Thạch Thất",
    "lat": "21.0774",
    "lng": "105.6055"
  },
  {
    "country": "Việt Nam",
    "name": "Chương Mỹ",
    "lat": "20.9119",
    "lng": "105.6567"
  },
  {
    "country": "Việt Nam",
    "name": "Thanh Oai",
    "lat": "20.925",
    "lng": "105.7047"
  },
  {
    "country": "Việt Nam",
    "name": "Thường Tín",
    "lat": "20.8749",
    "lng": "105.8758"
  },
  {
    "country": "Việt Nam",
    "name": "Phú Xuyên",
    "lat": "20.722",
    "lng": "105.8747"
  },
  {
    "country": "Việt Nam",
    "name": "Ứng Hòa",
    "lat": "20.7332",
    "lng": "105.7733"
  },
  {
    "country": "Việt Nam",
    "name": "Mỹ Đức",
    "lat": "20.7308",
    "lng": "105.7327"
  },
  // TpHCM
  {
    "country": "Việt Nam",
    "name": "Quận 1",
    "lat": "10.7809",
    "lng": "106.6992"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 2",
    "lat": "10.7917",
    "lng": "106.7373"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 3",
    "lat": "10.7757",
    "lng": "106.6866"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 4",
    "lat": "10.7592",
    "lng": "106.7041"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 5",
    "lat": "10.7563",
    "lng": "106.6709"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 6",
    "lat": "10.7467",
    "lng": "106.6348"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 7",
    "lat": "10.7383",
    "lng": "106.7225"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 8",
    "lat": "10.7401",
    "lng": "106.663"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 9",
    "lat": "10.8276",
    "lng": "106.831"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 10",
    "lat": "10.7731",
    "lng": "106.6678"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 11",
    "lat": "10.7667",
    "lng": "106.6506"
  },
  {
    "country": "Việt Nam",
    "name": "Quận 12",
    "lat": "10.8504",
    "lng": "106.627"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Bình Tân",
    "lat": "10.7485",
    "lng": "106.6057"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Bình Thạnh",
    "lat": "10.8101",
    "lng": "106.6906"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Gò Vấp",
    "lat": "10.8381",
    "lng": "106.6656"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Phú Nhuận",
    "lat": "10.7994",
    "lng": "106.6803"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Tân Bình",
    "lat": "10.8021",
    "lng": "106.6527"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Tân Phú",
    "lat": "10.7908",
    "lng": "106.6286"
  },
  {
    "country": "Việt Nam",
    "name": "Quận Thủ Đức",
    "lat": "10.8482",
    "lng": "106.7538"
  },
  {
    "country": "Việt Nam",
    "name": "Huyện Bình Chánh",
    "lat": "10.6985",
    "lng": "106.547"
  },
  {
    "country": "Việt Nam",
    "name": "Huyện Cần Giờ",
    "lat": "10.415",
    "lng": "106.961"
  },
  {
    "country": "Việt Nam",
    "name": "Huyện Củ Chi",
    "lat": "11.0329",
    "lng": "106.5179"
  },
  {
    "country": "Việt Nam",
    "name": "Huyện Hóc Môn",
    "lat": "10.8772",
    "lng": "106.5919"
  },
  {
    "country": "Việt Nam",
    "name": "Huyện Nhà Bè",
    "lat": "10.6373",
    "lng": "106.7384"
  },
  //Hải Phòng
  {
    "country": "Việt Nam",
    "name": "Hồng Bàng",
    "lat": "20.862",
    "lng": "106.6834"
  },
  {
    "country": "Việt Nam",
    "name": "Ngô Quyền",
    "lat": "20.8615",
    "lng": "106.6757"
  },
  {
    "country": "Việt Nam",
    "name": "Lê Chân",
    "lat": "20.8583",
    "lng": "106.685"
  },
  {
    "country": "Việt Nam",
    "name": "Hải An",
    "lat": "20.8325",
    "lng": "106.658"
  },
  {
    "country": "Việt Nam",
    "name": "Kiến An",
    "lat": "20.8333",
    "lng": "106.6834"
  },
  {
    "country": "Việt Nam",
    "name": "Đồ Sơn",
    "lat": "20.7344",
    "lng": "106.5817"
  },
  {
    "country": "Việt Nam",
    "name": "An Dương",
    "lat": "20.8367",
    "lng": "106.6527"
  },
  {
    "country": "Việt Nam",
    "name": "An Lão",
    "lat": "20.8183",
    "lng": "106.6757"
  },
  {
    "country": "Việt Nam",
    "name": "Kiến Thuỵ",
    "lat": "20.9344",
    "lng": "106.7466"
  },
  {
    "country": "Việt Nam",
    "name": "Tiên Lãng",
    "lat": "20.9667",
    "lng": "106.75"
  },
  {
    "country": "Việt Nam",
    "name": "Vĩnh Bảo",
    "lat": "20.7833",
    "lng": "106.651"
  },
  {
    "country": "Việt Nam",
    "name": "Cát Hải",
    "lat": "20.812",
    "lng": "106.961"
  },
  {
    "country": "Việt Nam",
    "name": "Bạch Long Vĩ",
    "lat": "20.1744",
    "lng": "107.671"
  },
  //Đà Nẫng
  {
    "country": "Việt Nam",
    "name": "Hải Châu",
    "lat": "16.0617",
    "lng": "108.2214"
},
{
    "country": "Việt Nam",
    "name": "Thanh Khê",
    "lat": "16.0642",
    "lng": "108.174"
},
{
    "country": "Việt Nam",
    "name": "Sơn Trà",
    "lat": "16.0919",
    "lng": "108.2414"
},
{
    "country": "Việt Nam",
    "name": "Ngũ Hành Sơn",
    "lat": "16.0127",
    "lng": "108.2869"
},
{
    "country": "Việt Nam",
    "name": "Liên Chiểu",
    "lat": "16.0706",
    "lng": "108.1864"
},
{
    "country": "Việt Nam",
    "name": "Cẩm Lệ",
    "lat": "16.0305",
    "lng": "108.1998"
},
{
    "country": "Việt Nam",
    "name": "Hòa Vang",
    "lat": "15.9886",
    "lng": "108.1016"
},
//Đắk Lắk
{
  "country": "Việt Nam",
  "name": "Buôn Ma Thuột",
  "lat": "12.6675",
  "lng": "108.0382"
},
{
  "country": "Việt Nam",
  "name": "Buôn Hồ",
  "lat": "12.6639",
  "lng": "108.0439"
},
{
  "country": "Việt Nam",
  "name": "Ea H'leo",
  "lat": "12.9167",
  "lng": "108.15"
},
{
  "country": "Việt Nam",
  "name": "Ea Súp",
  "lat": "12.872",
  "lng": "108.293"
},
{
  "country": "Việt Nam",
  "name": "Krông Buk",
  "lat": "12.85",
  "lng": "107.967"
},
{
  "country": "Việt Nam",
  "name": "Krông Năng",
  "lat": "12.649",
  "lng": "108.158"
},
{
  "country": "Việt Nam",
  "name": "Krông Pắc",
  "lat": "12.482",
  "lng": "108.038"
},
{
  "country": "Việt Nam",
  "name": "Krông A Na",
  "lat": "12.7",
  "lng": "107.917"
},
{
  "country": "Việt Nam",
  "name": "Lắk",
  "lat": "12.6675",
  "lng": "108.0382"
},
{
  "country": "Việt Nam",
  "name": "M'Đrăk",
  "lat": "12.775",
  "lng": "108.062"
},
{
  "country": "Việt Nam",
  "name": "Krông Bông",
  "lat": "12.8",
  "lng": "108.317"
},
{
  "country": "Việt Nam",
  "name": "Cư M'gar",
  "lat": "12.95",
  "lng": "108.116"
},
//Đắk Nông
{
  "country": "Việt Nam",
  "name": "Gia Nghĩa",
  "lat": "12.005",
  "lng": "107.801"
},
{
  "country": "Việt Nam",
  "name": "Đăk R'Lấp",
  "lat": "12.262",
  "lng": "107.55"
},
{
  "country": "Việt Nam",
  "name": "Đăk Mil",
  "lat": "12.224",
  "lng": "107.931"
},
{
  "country": "Việt Nam",
  "name": "Krông Nô",
  "lat": "11.99",
  "lng": "107.696"
},
{
  "country": "Việt Nam",
  "name": "Cư Kuin",
  "lat": "11.856",
  "lng": "107.671"
},
{
  "country": "Việt Nam",
  "name": "Đăk Song",
  "lat": "12.365",
  "lng": "107.59"
},
//Lâm Đồng
{
  "country": "Việt Nam",
  "name": "Đà Lạt",
  "lat": "11.9465",
  "lng": "108.4419"
},
{
  "country": "Việt Nam",
  "name": "Bảo Lộc",
  "lat": "11.5505",
  "lng": "107.7977"
},
{
  "country": "Việt Nam",
  "name": "Đam Rông",
  "lat": "11.8167",
  "lng": "108.3667"
},
{
  "country": "Việt Nam",
  "name": "Di Linh",
  "lat": "11.5695",
  "lng": "108.0955"
},
{
  "country": "Việt Nam",
  "name": "Đơn Dương",
  "lat": "12.0326",
  "lng": "108.2166"
},
{
  "country": "Việt Nam",
  "name": "Đức Trọng",
  "lat": "11.6712",
  "lng": "108.4413"
},
{
  "country": "Việt Nam",
  "name": "Lạc Dương",
  "lat": "11.7711",
  "lng": "108.5308"
},
{
  "country": "Việt Nam",
  "name": "Lâm Hà",
  "lat": "11.6022",
  "lng": "108.5877"
},
//Lào Cai
{
  "country": "Việt Nam",
  "name": "Lào Cai",
  "lat": "22.4856",
  "lng": "103.9737"
},
{
  "country": "Việt Nam",
  "name": "Bát Xát",
  "lat": "22.5799",
  "lng": "103.9464"
},
{
  "country": "Việt Nam",
  "name": "Mường Khương",
  "lat": "22.6816",
  "lng": "104.1411"
},
{
  "country": "Việt Nam",
  "name": "Si Ma Cai",
  "lat": "22.7234",
  "lng": "104.2874"
},
{
  "country": "Việt Nam",
  "name": "Bắc Hà",
  "lat": "22.5244",
  "lng": "104.3022"
},
{
  "country": "Việt Nam",
  "name": "Bảo Thắng",
  "lat": "22.5366",
  "lng": "103.9833"
},
{
  "country": "Việt Nam",
  "name": "Bảo Yên",
  "lat": "22.3604",
  "lng": "104.117"
},
{
  "country": "Việt Nam",
  "name": "Sa Pa",
  "lat": "22.3362",
  "lng": "103.8443"
},
{
  "country": "Việt Nam",
  "name": "Văn Bàn",
  "lat": "22.1284",
  "lng": "104.0047"
},
//Lai Châu
{
  "country": "Việt Nam",
  "name": "Lai Châu",
  "lat": "22.3976",
  "lng": "103.4584"
},
{
  "country": "Việt Nam",
  "name": "Tam Đường",
  "lat": "22.4509",
  "lng": "103.4941"
},
{
  "country": "Việt Nam",
  "name": "Mường Tè",
  "lat": "22.2997",
  "lng": "102.7603"
},
{
  "country": "Việt Nam",
  "name": "Sìn Hồ",
  "lat": "22.1437",
  "lng": "103.3144"
},
{
  "country": "Việt Nam",
  "name": "Phong Thổ",
  "lat": "22.5491",
  "lng": "103.3924"
},
{
  "country": "Việt Nam",
  "name": "Than Uyên",
  "lat": "22.4245",
  "lng": "103.6962"
},
//
{
  "country": "Việt Nam",
  "name": "Tân An",
  "lat": "10.5365",
  "lng": "106.4093"
},
{
  "country": "Việt Nam",
  "name": "Tân Hưng",
  "lat": "10.5607",
  "lng": "106.578"
},
{
  "country": "Việt Nam",
  "name": "Vĩnh Hưng",
  "lat": "10.742",
  "lng": "106.437"
},
{
  "country": "Việt Nam",
  "name": "Mộc Hóa",
  "lat": "10.574",
  "lng": "106.282"
},
{
  "country": "Việt Nam",
  "name": "Tân Thạnh",
  "lat": "10.592",
  "lng": "106.14"
},
{
  "country": "Việt Nam",
  "name": "Thạnh Hóa",
  "lat": "10.546",
  "lng": "106.347"
},
{
  "country": "Việt Nam",
  "name": "Đức Huệ",
  "lat": "10.445",
  "lng": "106.335"
},
{
  "country": "Việt Nam",
  "name": "Đức Hòa",
  "lat": "10.552",
  "lng": "106.444"
},
{
  "country": "Việt Nam",
  "name": "Bến Lức",
  "lat": "10.62",
  "lng": "106.541"
},
{
  "country": "Việt Nam",
  "name": "Thủ Thừa",
  "lat": "10.634",
  "lng": "106.56"
},
{
  "country": "Việt Nam",
  "name": "Tân Trụ",
  "lat": "10.751",
  "lng": "106.615"
},
{
  "country": "Việt Nam",
  "name": "Cần Đước",
  "lat": "10.68",
  "lng": "106.469"
},
{
  "country": "Việt Nam",
  "name": "Cần Giuộc",
  "lat": "10.715",
  "lng": "106.575"
},
{
  "country": "Việt Nam",
  "name": "Châu Thành",
  "lat": "10.57",
  "lng": "106.68"
},
//Nam Định
{
  "country": "Việt Nam",
  "name": "Nam Định",
  "lat": "20.4333",
  "lng": "106.1667"
},
{
  "country": "Việt Nam",
  "name": "Mỹ Lộc",
  "lat": "20.637",
  "lng": "106.162"
},
{
  "country": "Việt Nam",
  "name": "Vụ Bản",
  "lat": "20.648",
  "lng": "106.333"
},
{
  "country": "Việt Nam",
  "name": "Ý Yên",
  "lat": "20.455",
  "lng": "106.239"
},
{
  "country": "Việt Nam",
  "name": "Nghĩa Hưng",
  "lat": "20.325",
  "lng": "106.333"
},
{
  "country": "Việt Nam",
  "name": "Nam Trực",
  "lat": "20.257",
  "lng": "106.233"
},
{
  "country": "Việt Nam",
  "name": "Xuân Trường",
  "lat": "20.398",
  "lng": "106.382"
},
{
  "country": "Việt Nam",
  "name": "Giao Thủy",
  "lat": "20.258",
  "lng": "106.458"
},
{
  "country": "Việt Nam",
  "name": "Hải Hậu",
  "lat": "20.185",
  "lng": "106.291"
},
//Nghệ An
{
  "country": "Việt Nam",
  "name": "Vinh",
  "lat": "18.6716",
  "lng": "105.6921"
},
{
  "country": "Việt Nam",
  "name": "Cửa Lò",
  "lat": "18.8113",
  "lng": "105.6999"
},
{
  "country": "Việt Nam",
  "name": "Thái Hoà",
  "lat": "19.485",
  "lng": "105.366"
},
{
  "country": "Việt Nam",
  "name": "Quỳnh Lưu",
  "lat": "18.857",
  "lng": "105.676"
},
{
  "country": "Việt Nam",
  "name": "Quế Phong",
  "lat": "18.686",
  "lng": "105.41"
},
{
  "country": "Việt Nam",
  "name": "Kỳ Sơn",
  "lat": "18.627",
  "lng": "105.41"
},
{
  "country": "Việt Nam",
  "name": "Tương Dương",
  "lat": "18.717",
  "lng": "105.651"
},
{
  "country": "Việt Nam",
  "name": "Nghĩa Đàn",
  "lat": "18.793",
  "lng": "105.708"
},
{
  "country": "Việt Nam",
  "name": "Quỳ Hợp",
  "lat": "18.703",
  "lng": "105.718"
},
{
  "country": "Việt Nam",
  "name": "Quỳ Châu",
  "lat": "18.736",
  "lng": "105.593"
},
{
  "country": "Việt Nam",
  "name": "Con Cuông",
  "lat": "19.118",
  "lng": "105.409"
},
{
  "country": "Việt Nam",
  "name": "Tân Kỳ",
  "lat": "19.004",
  "lng": "105.554"
},
{
  "country": "Việt Nam",
  "name": "Anh Sơn",
  "lat": "19.123",
  "lng": "105.679"
},
{
  "country": "Việt Nam",
  "name": "Diễn Châu",
  "lat": "18.902",
  "lng": "105.717"
},
{
  "country": "Việt Nam",
  "name": "Yên Thành",
  "lat": "18.715",
  "lng": "105.781"
},
{
  "country": "Việt Nam",
  "name": "Đô Lương",
  "lat": "18.688",
  "lng": "105.935"
},
{
  "country": "Việt Nam",
  "name": "Thanh Chương",
  "lat": "18.799",
  "lng": "105.921"
},
{
  "country": "Việt Nam",
  "name": "Nghi Lộc",
  "lat": "18.828",
  "lng": "105.781"
},
{
  "country": "Việt Nam",
  "name": "Nam Đàn",
  "lat": "18.757",
  "lng": "105.704"
},
{
  "country": "Việt Nam",
  "name": "Hưng Nguyên",
  "lat": "18.794",
  "lng": "105.937"
},
{
  "country": "Việt Nam",
  "name": "Hoàng Mai",
  "lat": "18.731",
  "lng": "105.818"
},
//Ninh Bình
{
  "country": "Việt Nam",
  "name": "Ninh Bình",
  "lat": "20.253",
  "lng": "105.974"
},
{
  "country": "Việt Nam",
  "name": "Tam Điệp",
  "lat": "20.156",
  "lng": "105.972"
},
{
  "country": "Việt Nam",
  "name": "Nho Quan",
  "lat": "20.210",
  "lng": "105.586"
},
{
  "country": "Việt Nam",
  "name": "Gia Viễn",
  "lat": "20.305",
  "lng": "106.011"
},
{
  "country": "Việt Nam",
  "name": "Hoa Lư",
  "lat": "20.24",
  "lng": "105.956"
},
{
  "country": "Việt Nam",
  "name": "Yên Khánh",
  "lat": "20.308",
  "lng": "106.083"
},
{
  "country": "Việt Nam",
  "name": "Kim Sơn",
  "lat": "20.388",
  "lng": "106.055"
},
{
  "country": "Việt Nam",
  "name": "Yên Mô",
  "lat": "20.167",
  "lng": "105.817"
},
//Ninh Thuận
{
  "country": "Việt Nam",
  "name": "Phan Rang-Tháp Chàm",
  "lat": "11.5682",
  "lng": "108.9959"
},
{
  "country": "Việt Nam",
  "name": "Bác Ái",
  "lat": "11.8952",
  "lng": "108.8498"
},
{
  "country": "Việt Nam",
  "name": "Ninh Sơn",
  "lat": "11.7537",
  "lng": "108.9316"
},
{
  "country": "Việt Nam",
  "name": "Ninh Hải",
  "lat": "11.6933",
  "lng": "108.8569"
},
{
  "country": "Việt Nam",
  "name": "Ninh Phước",
  "lat": "11.6359",
  "lng": "108.9553"
},
{
  "country": "Việt Nam",
  "name": "Thuận Bắc",
  "lat": "11.6241",
  "lng": "109.1"
},
{
  "country": "Việt Nam",
  "name": "Thuận Nam",
  "lat": "11.4587",
  "lng": "108.7484"
},
//Phú Thọ
{
  "country": "Việt Nam",
  "name": "Việt Trì",
  "lat": "21.3264",
  "lng": "105.4019"
},
{
  "country": "Việt Nam",
  "name": "Phú Thọ",
  "lat": "21.4167",
  "lng": "105.2167"
},
{
  "country": "Việt Nam",
  "name": "Đoan Hùng",
  "lat": "21.4204",
  "lng": "105.0945"
},
{
  "country": "Việt Nam",
  "name": "Hạ Hòa",
  "lat": "21.452",
  "lng": "105.019"
},
{
  "country": "Việt Nam",
  "name": "Thanh Ba",
  "lat": "21.335",
  "lng": "105.208"
},
{
  "country": "Việt Nam",
  "name": "Phù Ninh",
  "lat": "21.297",
  "lng": "105.404"
},
{
  "country": "Việt Nam",
  "name": "Yên Lập",
  "lat": "21.293",
  "lng": "105.124"
},
{
  "country": "Việt Nam",
  "name": "Cẩm Khê",
  "lat": "21.285",
  "lng": "105.372"
},
{
  "country": "Việt Nam",
  "name": "Tam Nông",
  "lat": "21.359",
  "lng": "105.504"
},
{
  "country": "Việt Nam",
  "name": "Lâm Thao",
  "lat": "21.305",
  "lng": "105.297"
},
{
  "country": "Việt Nam",
  "name": "Thanh Sơn",
  "lat": "21.319",
  "lng": "105.509"
},
{
  "country": "Việt Nam",
  "name": "Thanh Thuỷ",
  "lat": "21.427",
  "lng": "105.531"
},
{
  "country": "Việt Nam",
  "name": "Tân Sơn",
  "lat": "21.483",
  "lng": "105.582"
},
//Phú Yên
{
  "country": "Việt Nam",
  "name": "Tuy Hòa",
  "lat": "13.0886",
  "lng": "109.299"
},
{
  "country": "Việt Nam",
  "name": "Sông Cầu",
  "lat": "13.4521",
  "lng": "109.2199"
},
{
  "country": "Việt Nam",
  "name": "Đông Hòa",
  "lat": "13.523",
  "lng": "109.113"
},
{
  "country": "Việt Nam",
  "name": "Tuy An",
  "lat": "13.236",
  "lng": "109.338"
},
{
  "country": "Việt Nam",
  "name": "Sơn Hòa",
  "lat": "13.387",
  "lng": "109.186"
},
{
  "country": "Việt Nam",
  "name": "Sông Hinh",
  "lat": "13.265",
  "lng": "109.257"
},
{
  "country": "Việt Nam",
  "name": "Tây Hoà",
  "lat": "13.255",
  "lng": "109.348"
},
{
  "country": "Việt Nam",
  "name": "Phú Hoà",
  "lat": "13.121",
  "lng": "109.27"
},
//Quảng Bình
{
  "country": "Việt Nam",
  "name": "Đồng Hới",
  "lat": "17.4728",
  "lng": "106.6043"
},
{
  "country": "Việt Nam",
  "name": "Ba Đồn",
  "lat": "17.4408",
  "lng": "106.3573"
},
{
  "country": "Việt Nam",
  "name": "Tuyên Hóa",
  "lat": "17.7186",
  "lng": "106.2223"
},
{
  "country": "Việt Nam",
  "name": "Minh Hóa",
  "lat": "17.8245",
  "lng": "105.9221"
},
{
  "country": "Việt Nam",
  "name": "Quảng Trạch",
  "lat": "17.6481",
  "lng": "106.4357"
},
{
  "country": "Việt Nam",
  "name": "Bố Trạch",
  "lat": "17.5477",
  "lng": "106.2031"
},
{
  "country": "Việt Nam",
  "name": "Lệ Thủy",
  "lat": "17.4796",
  "lng": "106.599"
},
//Quảng Nam
{
  "country": "Việt Nam",
  "name": "Tam Kỳ",
  "lat": "15.573",
  "lng": "108.479"
},
{
  "country": "Việt Nam",
  "name": "Hội An",
  "lat": "15.879",
  "lng": "108.328"
},
{
  "country": "Việt Nam",
  "name": "Tây Giang",
  "lat": "15.417",
  "lng": "107.568"
},
{
  "country": "Việt Nam",
  "name": "Đông Giang",
  "lat": "15.633",
  "lng": "108.079"
},
{
  "country": "Việt Nam",
  "name": "Đại Lộc",
  "lat": "15.75",
  "lng": "108.3"
},
{
  "country": "Việt Nam",
  "name": "Điện Bàn",
  "lat": "15.88",
  "lng": "108.252"
},
{
  "country": "Việt Nam",
  "name": "Duy Xuyên",
  "lat": "15.789",
  "lng": "108.306"
},
{
  "country": "Việt Nam",
  "name": "Quế Sơn",
  "lat": "15.523",
  "lng": "108.746"
},
{
  "country": "Việt Nam",
  "name": "Nam Giang",
  "lat": "15.607",
  "lng": "107.843"
},
{
  "country": "Việt Nam",
  "name": "Phước Sơn",
  "lat": "15.567",
  "lng": "108.107"
},
{
  "country": "Việt Nam",
  "name": "Hiệp Đức",
  "lat": "15.866",
  "lng": "108.197"
},
{
  "country": "Việt Nam",
  "name": "Nông Sơn",
  "lat": "15.85",
  "lng": "108.35"
},
//Quảng Ngãi
{
  "country": "Việt Nam",
  "name": "Quảng Ngãi",
  "lat": "15.121",
  "lng": "108.798"
},
{
  "country": "Việt Nam",
  "name": "Bình Sơn",
  "lat": "15.267",
  "lng": "108.795"
},
{
  "country": "Việt Nam",
  "name": "Trà Bồng",
  "lat": "15.227",
  "lng": "108.565"
},
{
  "country": "Việt Nam",
  "name": "Sơn Tịnh",
  "lat": "15.205",
  "lng": "108.648"
},
{
  "country": "Việt Nam",
  "name": "Tư Nghĩa",
  "lat": "15.078",
  "lng": "108.914"
},
{
  "country": "Việt Nam",
  "name": "Sơn Hà",
  "lat": "15.235",
  "lng": "108.96"
},
{
  "country": "Việt Nam",
  "name": "Sơn Tây",
  "lat": "15.183",
  "lng": "108.67"
},
{
  "country": "Việt Nam",
  "name": "Minh Long",
  "lat": "14.971",
  "lng": "108.985"
},
{
  "country": "Việt Nam",
  "name": "Nghĩa Hành",
  "lat": "15.058",
  "lng": "108.64"
},
{
  "country": "Việt Nam",
  "name": "Mộ Đức",
  "lat": "15.265",
  "lng": "108.92"
},
//Quảng Ninh
{
  "country": "Việt Nam",
  "name": "Hạ Long",
  "lat": "20.9517",
  "lng": "107.067"
},
{
  "country": "Việt Nam",
  "name": "Móng Cái",
  "lat": "21.4306",
  "lng": "107.847"
},
{
  "country": "Việt Nam",
  "name": "Cẩm Phả",
  "lat": "21.025",
  "lng": "107.29"
},
{
  "country": "Việt Nam",
  "name": "Uông Bí",
  "lat": "21.039",
  "lng": "106.766"
},
{
  "country": "Việt Nam",
  "name": "Quảng Yên",
  "lat": "20.955",
  "lng": "106.794"
},
{
  "country": "Việt Nam",
  "name": "Đông Triều",
  "lat": "21.141",
  "lng": "106.575"
},
{
  "country": "Việt Nam",
  "name": "Hoành Bồ",
  "lat": "20.931",
  "lng": "106.685"
},
{
  "country": "Việt Nam",
  "name": "Ba Chẽ",
  "lat": "21.239",
  "lng": "107.104"
},
{
  "country": "Việt Nam",
  "name": "Vân Đồn",
  "lat": "20.918",
  "lng": "107.04"
},
{
  "country": "Việt Nam",
  "name": "Tiên Yên",
  "lat": "21.004",
  "lng": "107.455"
},
{
  "country": "Việt Nam",
  "name": "Đầm Hà",
  "lat": "21.433",
  "lng": "107.598"
},
{
  "country": "Việt Nam",
  "name": "Hải Hà",
  "lat": "21.3",
  "lng": "107.633"
},
//Quảng Trị
{
  "country": "Việt Nam",
  "name": "Đông Hà",
  "lat": "16.816",
  "lng": "107.1"
},
{
  "country": "Việt Nam",
  "name": "Quảng Trị",
  "lat": "16.7504",
  "lng": "107.1833"
},
{
  "country": "Việt Nam",
  "name": "Vị Xuyên",
  "lat": "16.7633",
  "lng": "106.5933"
},
{
  "country": "Việt Nam",
  "name": "Hải Lăng",
  "lat": "16.7937",
  "lng": "106.9821"
},
{
  "country": "Việt Nam",
  "name": "Triệu Phong",
  "lat": "16.7558",
  "lng": "107.1446"
},
{
  "country": "Việt Nam",
  "name": "Hướng Hóa",
  "lat": "16.6633",
  "lng": "106.5833"
},
{
  "country": "Việt Nam",
  "name": "Gio Linh",
  "lat": "16.7442",
  "lng": "107.0247"
},
{
  "country": "Việt Nam",
  "name": "Cồn Cỏ",
  "lat": "17.0667",
  "lng": "107.3"
},
//Sóc Trăng
{
  "country": "Việt Nam",
  "name": "Sóc Trăng",
  "lat": "9.603",
  "lng": "105.98"
},
{
  "country": "Việt Nam",
  "name": "Châu Thành",
  "lat": "9.583",
  "lng": "105.83"
},
{
  "country": "Việt Nam",
  "name": "Kế Sách",
  "lat": "9.745",
  "lng": "105.915"
},
{
  "country": "Việt Nam",
  "name": "Mỹ Tú",
  "lat": "9.588",
  "lng": "106.029"
},
{
  "country": "Việt Nam",
  "name": "Mỹ Xuyên",
  "lat": "9.567",
  "lng": "105.972"
},
{
  "country": "Việt Nam",
  "name": "Thạnh Trị",
  "lat": "9.523",
  "lng": "105.842"
},
{
  "country": "Việt Nam",
  "name": "Long Phú",
  "lat": "9.641",
  "lng": "106.069"
},
{
  "country": "Việt Nam",
  "name": "Vĩnh Châu",
  "lat": "9.903",
  "lng": "105.981"
},
{
  "country": "Việt Nam",
  "name": "Trần Đề",
  "lat": "9.539",
  "lng": "105.947"
},
//Sơn La
{
  "country": "Việt Nam",
  "name": "Sơn La",
  "lat": "21.33",
  "lng": "103.91"
},
{
  "country": "Việt Nam",
  "name": "Quỳnh Nhai",
  "lat": "21.202",
  "lng": "103.666"
},
{
  "country": "Việt Nam",
  "name": "Thuận Châu",
  "lat": "21.383",
  "lng": "103.622"
},
{
  "country": "Việt Nam",
  "name": "Mường La",
  "lat": "21.567",
  "lng": "104.033"
},
{
  "country": "Việt Nam",
  "name": "Bắc Yên",
  "lat": "21.569",
  "lng": "104.474"
},
{
  "country": "Việt Nam",
  "name": "Phù Yên",
  "lat": "21.249",
  "lng": "104.655"
},
{
  "country": "Việt Nam",
  "name": "Mộc Châu",
  "lat": "20.826",
  "lng": "104.671"
},
{
  "country": "Việt Nam",
  "name": "Yên Châu",
  "lat": "21.58",
  "lng": "104.432"
},
{
  "country": "Việt Nam",
  "name": "Mai Sơn",
  "lat": "21.378",
  "lng": "104.171"
},
{
  "country": "Việt Nam",
  "name": "Sông Mã",
  "lat": "21.387",
  "lng": "103.88"
},
{
  "country": "Việt Nam",
  "name": "Sốp Cộp",
  "lat": "21.356",
  "lng": "103.722"
},
//Tây Ninh
{
  "country": "Việt Nam",
  "name": "Tây Ninh",
  "lat": "11.299",
  "lng": "106.096"
},
{
  "country": "Việt Nam",
  "name": "Tân Biên",
  "lat": "11.326",
  "lng": "105.935"
},
{
  "country": "Việt Nam",
  "name": "Tân Châu",
  "lat": "11.315",
  "lng": "106.186"
},
{
  "country": "Việt Nam",
  "name": "Dương Minh Châu",
  "lat": "11.279",
  "lng": "106.347"
},
{
  "country": "Việt Nam",
  "name": "Châu Thành",
  "lat": "11.228",
  "lng": "106.303"
},
{
  "country": "Việt Nam",
  "name": "Hòa Thành",
  "lat": "11.184",
  "lng": "106.206"
},
{
  "country": "Việt Nam",
  "name": "Bến Cầu",
  "lat": "11.154",
  "lng": "106.152"
},
{
  "country": "Việt Nam",
  "name": "Trảng Bàng",
  "lat": "11.116",
  "lng": "106.225"
},
//Thái Bình
{
  "country": "Việt Nam",
  "name": "Thái Bình",
  "lat": "20.449",
  "lng": "106.338"
},
{
  "country": "Việt Nam",
  "name": "Quỳnh Phụ",
  "lat": "20.547",
  "lng": "106.294"
},
{
  "country": "Việt Nam",
  "name": "Hưng Hà",
  "lat": "20.678",
  "lng": "106.541"
},
{
  "country": "Việt Nam",
  "name": "Đông Hưng",
  "lat": "20.612",
  "lng": "106.425"
},
{
  "country": "Việt Nam",
  "name": "Thái Thụy",
  "lat": "20.9",
  "lng": "106.33"
},
{
  "country": "Việt Nam",
  "name": "Tiền Hải",
  "lat": "20.494",
  "lng": "106.636"
},
{
  "country": "Việt Nam",
  "name": "Kiến Xương",
  "lat": "20.727",
  "lng": "106.475"
},
//Thái Nguyên
{
  "country": "Việt Nam",
  "name": "Thái Nguyên",
  "lat": "21.592",
  "lng": "105.844"
},
{
  "country": "Việt Nam",
  "name": "Sông Công",
  "lat": "21.477",
  "lng": "105.817"
},
{
  "country": "Việt Nam",
  "name": "Định Hóa",
  "lat": "21.436",
  "lng": "105.676"
},
{
  "country": "Việt Nam",
  "name": "Phổ Yên",
  "lat": "21.442",
  "lng": "105.983"
},
{
  "country": "Việt Nam",
  "name": "Đại Từ",
  "lat": "21.431",
  "lng": "105.579"
},
{
  "country": "Việt Nam",
  "name": "Phú Lương",
  "lat": "21.593",
  "lng": "105.873"
},
// Thanh Hóa
{
  "country": "Việt Nam",
  "name": "Thanh Hóa",
  "lat": "19.8",
  "lng": "105.766"
},
{
  "country": "Việt Nam",
  "name": "Bỉm Sơn",
  "lat": "20.1",
  "lng": "105.85"
},
{
  "country": "Việt Nam",
  "name": "Sầm Sơn",
  "lat": "19.75",
  "lng": "105.9167"
},
{
  "country": "Việt Nam",
  "name": "Quan Hóa",
  "lat": "20.052",
  "lng": "105.3"
},
{
  "country": "Việt Nam",
  "name": "Quan Sơn",
  "lat": "20.447",
  "lng": "105.157"
},
{
  "country": "Việt Nam",
  "name": "Bá Thước",
  "lat": "20.75",
  "lng": "105.2"
},
{
  "country": "Việt Nam",
  "name": "Quảng Xương",
  "lat": "19.8",
  "lng": "105.733"
},
{
  "country": "Việt Nam",
  "name": "Tĩnh Gia",
  "lat": "19.875",
  "lng": "105.749"
},
{
  "country": "Việt Nam",
  "name": "Yên Định",
  "lat": "19.933",
  "lng": "105.633"
},
{
  "country": "Việt Nam",
  "name": "Đông Sơn",
  "lat": "19.993",
  "lng": "105.9"
},
{
  "country": "Việt Nam",
  "name": "Hậu Lộc",
  "lat": "19.978",
  "lng": "105.778"
},
{
  "country": "Việt Nam",
  "name": "Hà Trung",
  "lat": "20.043",
  "lng": "105.799"
},
{
  "country": "Việt Nam",
  "name": "Nga Sơn",
  "lat": "20.043",
  "lng": "105.678"
},
{
  "country": "Việt Nam",
  "name": "Như Thanh",
  "lat": "20.3",
  "lng": "105.766"
},
{
  "country": "Việt Nam",
  "name": "Như Xuân",
  "lat": "20.15",
  "lng": "105.716"
},
{
  "country": "Việt Nam",
  "name": "Nông Cống",
  "lat": "20.2",
  "lng": "105.75"
},
{
  "country": "Việt Nam",
  "name": "Thiệu Hóa",
  "lat": "20.122",
  "lng": "105.53"
},
{
  "country": "Việt Nam",
  "name": "Thọ Xuân",
  "lat": "19.85",
  "lng": "105.616"
},
{
  "country": "Việt Nam",
  "name": "Thường Xuân",
  "lat": "19.75",
  "lng": "105.516"
},
{
  "country": "Việt Nam",
  "name": "Triệu Sơn",
  "lat": "19.65",
  "lng": "105.65"
},
{
  "country": "Việt Nam",
  "name": "Vĩnh Lộc",
  "lat": "19.85",
  "lng": "105.8"
},
{
  "country": "Việt Nam",
  "name": "Yên Thành",
  "lat": "19.583",
  "lng": "105.75"
},
{
  "country": "Việt Nam",
  "name": "Quảng Xương",
  "lat": "19.8",
  "lng": "105.8"
},
{
  "country": "Việt Nam",
  "name": "Nông Cống",
  "lat": "20.5",
  "lng": "105.8"
},
{
  "country": "Việt Nam",
  "name": "Nga Sơn",
  "lat": "20.5",
  "lng": "105.666"
},
//Huế
{
  "country": "Việt Nam",
  "name": "Huế",
  "lat": "16.464",
  "lng": "107.585"
},
{
  "country": "Việt Nam",
  "name": "Hương Thủy",
  "lat": "16.425",
  "lng": "107.585"
},
{
  "country": "Việt Nam",
  "name": "Hương Trà",
  "lat": "16.23",
  "lng": "107.55"
},
{
  "country": "Việt Nam",
  "name": "A Lưới",
  "lat": "16.279",
  "lng": "107.497"
},
{
  "country": "Việt Nam",
  "name": "Phong Điền",
  "lat": "16.467",
  "lng": "107.672"
},
{
  "country": "Việt Nam",
  "name": "Quảng Điền",
  "lat": "16.565",
  "lng": "107.717"
},
{
  "country": "Việt Nam",
  "name": "Phú Vang",
  "lat": "16.37",
  "lng": "107.655"
},
//Tiền Giang
{
  "country": "Việt Nam",
  "name": "Mỹ Tho",
  "lat": "10.350",
  "lng": "106.370"
},
{
  "country": "Việt Nam",
  "name": "Gò Công",
  "lat": "10.350",
  "lng": "106.470"
},
{
  "country": "Việt Nam",
  "name": "Cai Lậy",
  "lat": "10.383",
  "lng": "106.2"
},
{
  "country": "Việt Nam",
  "name": "Cai Bè",
  "lat": "10.4",
  "lng": "106.2"
},
{
  "country": "Việt Nam",
  "name": "Châu Thành",
  "lat": "10.15",
  "lng": "106.3"
},
{
  "country": "Việt Nam",
  "name": "Chợ Gạo",
  "lat": "10.25",
  "lng": "106.3667"
},
{
  "country": "Việt Nam",
  "name": "Gò Công Tây",
  "lat": "10.3667",
  "lng": "106.4333"
},
{
  "country": "Việt Nam",
  "name": "Gò Công Đông",
  "lat": "10.333",
  "lng": "106.433"
},
{
  "country": "Việt Nam",
  "name": "Tân Phú Đông",
  "lat": "10.367",
  "lng": "106.317"
},
//Trà Vinh
{
  "country": "Việt Nam",
  "name": "Trà Vinh",
  "lat": "9.966",
  "lng": "106.35"
},
{
  "country": "Việt Nam",
  "name": "Càng Long",
  "lat": "9.873",
  "lng": "106.203"
},
{
  "country": "Việt Nam",
  "name": "Cầu Kè",
  "lat": "9.866",
  "lng": "106.44"
},
{
  "country": "Việt Nam",
  "name": "Tiểu Cần",
  "lat": "9.8",
  "lng": "106.366"
},
{
  "country": "Việt Nam",
  "name": "Châu Thành",
  "lat": "9.85",
  "lng": "106.283"
},
{
  "country": "Việt Nam",
  "name": "Cầu Ngang",
  "lat": "9.717",
  "lng": "106.466"
},
{
  "country": "Việt Nam",
  "name": "Duyên Hải",
  "lat": "9.657",
  "lng": "106.622"
},
//Tuyên Quang
{
  "country": "Việt Nam",
  "name": "Tuyên Quang",
  "lat": "21.816",
  "lng": "105.216"
},
{
  "country": "Việt Nam",
  "name": "Lâm Bình",
  "lat": "22.067",
  "lng": "105.1"
},
{
  "country": "Việt Nam",
  "name": "Na Hang",
  "lat": "22.25",
  "lng": "105.0667"
},
{
  "country": "Việt Nam",
  "name": "Chiêm Hóa",
  "lat": "21.717",
  "lng": "105.183"
},
{
  "country": "Việt Nam",
  "name": "Hàm Yên",
  "lat": "22.017",
  "lng": "105.283"
},
{
  "country": "Việt Nam",
  "name": "Yên Sơn",
  "lat": "21.987",
  "lng": "105.208"
},
//Vĩnh Long
{
  "country": "Việt Nam",
  "name": "Vĩnh Long",
  "lat": "10.25",
  "lng": "105.967"
},
{
  "country": "Việt Nam",
  "name": "Long Hồ",
  "lat": "10.242",
  "lng": "106.089"
},
{
  "country": "Việt Nam",
  "name": "Mang Thít",
  "lat": "10.149",
  "lng": "106.122"
},
{
  "country": "Việt Nam",
  "name": "Vũng Liêm",
  "lat": "10.083",
  "lng": "106.317"
},
{
  "country": "Việt Nam",
  "name": "Tam Bình",
  "lat": "10.233",
  "lng": "106.067"
},
{
  "country": "Việt Nam",
  "name": "Bình Minh",
  "lat": "10.283",
  "lng": "105.967"
},
{
  "country": "Việt Nam",
  "name": "Trà Ôn",
  "lat": "10.383",
  "lng": "106.183"
},
//Vĩnh Phúc
{
  "country": "Việt Nam",
  "name": "Vĩnh Yên",
  "lat": "21.308",
  "lng": "105.594"
},
{
  "country": "Việt Nam",
  "name": "Phúc Yên",
  "lat": "21.294",
  "lng": "105.712"
},
{
  "country": "Việt Nam",
  "name": "Yên Lạc",
  "lat": "21.171",
  "lng": "105.907"
},
{
  "country": "Việt Nam",
  "name": "Bình Xuyên",
  "lat": "21.181",
  "lng": "105.662"
},
{
  "country": "Việt Nam",
  "name": "Tam Dương",
  "lat": "21.384",
  "lng": "105.712"
},
{
  "country": "Việt Nam",
  "name": "Tam Đảo",
  "lat": "21.440",
  "lng": "105.634"
},
{
  "country": "Việt Nam",
  "name": "Lập Thạch",
  "lat": "21.382",
  "lng": "105.431"
},
{
  "country": "Việt Nam",
  "name": "Sông Lô",
  "lat": "21.276",
  "lng": "105.536"
},
//Yên Bái
{
  "country": "Việt Nam",
  "name": "Yên Bái",
  "lat": "21.722",
  "lng": "104.9"
},
{
  "country": "Việt Nam",
  "name": "Nghĩa Lộ",
  "lat": "21.685",
  "lng": "104.971"
},
{
  "country": "Việt Nam",
  "name": "Trạm Tấu",
  "lat": "21.771",
  "lng": "104.917"
},
{
  "country": "Việt Nam",
  "name": "Văn Yên",
  "lat": "21.593",
  "lng": "104.804"
},
{
  "country": "Việt Nam",
  "name": "Mù Căng Chải",
  "lat": "21.824",
  "lng": "104.043"
},
{
  "country": "Việt Nam",
  "name": "Trấn Yên",
  "lat": "21.781",
  "lng": "104.575"
},
{
  "country": "Việt Nam",
  "name": "Trạm Tấu",
  "lat": "21.876",
  "lng": "104.879"
},
{
  "country": "Việt Nam",
  "name": "Văn Chấn",
  "lat": "21.651",
  "lng": "104.963"
},
//Đồng Tháp
{
  "country": "Việt Nam",
  "name": "Cao Lãnh",
  "lat": "10.467",
  "lng": "105.637"
},
{
  "country": "Việt Nam",
  "name": "Sa Đéc",
  "lat": "10.299",
  "lng": "105.636"
},
{
  "country": "Việt Nam",
  "name": "Hồng Ngự",
  "lat": "10.6",
  "lng": "105.733"
},
{
  "country": "Việt Nam",
  "name": "Tam Nông",
  "lat": "10.667",
  "lng": "105.683"
},
{
  "country": "Việt Nam",
  "name": "Tháp Mười",
  "lat": "10.582",
  "lng": "105.518"
},
{
  "country": "Việt Nam",
  "name": "Tân Hồng",
  "lat": "10.457",
  "lng": "105.579"
},
{
  "country": "Việt Nam",
  "name": "Tam Nông",
  "lat": "10.747",
  "lng": "105.617"
},
{
  "country": "Việt Nam",
  "name": "Hồng Ngự",
  "lat": "10.783",
  "lng": "105.767"
},
{
  "country": "Việt Nam",
  "name": "Thanh Bình",
  "lat": "10.8",
  "lng": "105.85"
},
{
  "country": "Việt Nam",
  "name": "Cao Lãnh",
  "lat": "10.617",
  "lng": "105.633"
},
{
  "country": "Việt Nam",
  "name": "Lấp Vò",
  "lat": "10.533",
  "lng": "105.75"
},
//Đồng Nai
{
  "country": "Việt Nam",
  "name": "Biên Hòa",
  "lat": "10.950",
  "lng": "106.817"
},
{
  "country": "Việt Nam",
  "name": "Long Khánh",
  "lat": "10.933",
  "lng": "107.117"
},
{
  "country": "Việt Nam",
  "name": "Trảng Bom",
  "lat": "10.967",
  "lng": "106.967"
},
{
  "country": "Việt Nam",
  "name": "Vĩnh Cửu",
  "lat": "11.033",
  "lng": "107.083"
},
{
  "country": "Việt Nam",
  "name": "Định Quán",
  "lat": "11.2",
  "lng": "107.35"
},
{
  "country": "Việt Nam",
  "name": "Thống Nhất",
  "lat": "10.960",
  "lng": "106.950"
},
{
  "country": "Việt Nam",
  "name": "Long Thành",
  "lat": "10.783",
  "lng": "106.967"
},
{
  "country": "Việt Nam",
  "name": "Nhơn Trạch",
  "lat": "10.780",
  "lng": "106.890"
},
{
  "country": "Việt Nam",
  "name": "Cẩm Mỹ",
  "lat": "11.016",
  "lng": "107.000"
},
{
  "country": "Việt Nam",
  "name": "Long Định",
  "lat": "10.917",
  "lng": "106.833"
}
//....
];