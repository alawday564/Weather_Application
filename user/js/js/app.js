const temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    condition = document.getElementById("condition"),
    rain = document.getElementById("rain"),
    snow = document.getElementById("snow"),
    dew = document.getElementById("dew"),
    uvIndex = document.querySelector(".uv-index"),
    uvText = document.querySelector(".uv-text"),
    uvStatus = document.querySelector(".uv_icon_status"),
    uvIconText = document.querySelector(".uv_icon_text"),
    windSpeed = document.querySelector(".wind-speed"),
    windIconText = document.querySelector(".wind_icon_text"),
    windStatus = document.querySelector(".wind-status"),
    windIconStatus = document.querySelector(".wind_icon_status"),
    windgust = document.querySelector(".windgust"),
    windgustStatus = document.querySelector(".windgust-status"),
    windgustIconText = document.querySelector(".windgust_icon_text"),
    windgustIconStatus = document.querySelector(".windgust_icon_status"),
    sunRise = document.querySelector(".sun-rise"),
    sunSet = document.querySelector(".sun-set"),
    humidity = document.querySelector(".humidity"),
    humidityStatus = document.querySelector(".humidity-status"),
    humidityIconText = document.querySelector(".humidity_icon_text"),
    humidityIconStatus = document.querySelector(".humidity_icon_status"),
    visibility = document.querySelector(".visibility"),
    visibilityStatus = document.querySelector(".visibility-status"),
    visibilityIconText = document.querySelector(".visibility_icon_text"),
    visibilityIconStatus = document.querySelector(".visibility_icon_status"),
    airQuality = document.querySelector(".air-quality"),
    airQualityStatus = document.querySelector(".air-quality-status"),
    airQualityIconStatus = document.querySelector(".air_icon_status"),
    airQualityIconText = document.querySelector(".ari_icon_text"),
    pressure = document.querySelector(".pressure"),
    pressureStatus = document.querySelector(".pressure-status"),
    pressureIconText = document.querySelector(".pressure_icon_text"),
    pressureIconStatus = document.querySelector(".pressure_icon_status"),
    feel_like = document.querySelector(".feel_like"),
    feelStatus = document.querySelector(".feel_like-status"),
    feelIconStatus = document.querySelector(".feel_icon_status"),
    feelIconText = document.querySelector(".feel_icon_text"),
    Lunar = document.querySelector(".moon_phase"),


    mainIcon = document.getElementById("icon"),
    currentLocation = document.getElementById("location"),
    searchForm = document.querySelector("#search"),
    search = document.querySelector("#query"),
    celciusBtn = document.querySelector(".celcius"),
    fahrenheitBtn = document.querySelector(".fahrenheit"),
    tempUnit = document.querySelectorAll(".temp-unit"),
    hourlyBtn = document.querySelector(".hourly"),
    weekBtn = document.querySelector(".week"),
    weatherCards = document.querySelector("#weather-cards");

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
            windgust.innerText = days.windgust;
            update_Windgust(today.windgust);
            mainIcon.src = getIcon(today.icon);
            changeBackground(today.icon);
            humidity.innerText = today.humidity;
            update_Humidity(today.humidity);
            visibility.innerText = today.visibility;
            update_Visibility(today.visibility);
            airQuality.innerText = today.winddir;
            update_Air_Quality(today.winddir);
            pressure.innerText = today.pressure;
            update_Pressure(today.pressure);
            feel_like.innerText = today.feelslike + "°";
            update_Feel(today.feelslike);
            Lunar.innerText = today.moonphase;
            if (hourlyorWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, "week");
            }
            sunRise.innerText = covertTimeTo12HourFormat(today.sunrise);
            sunSet.innerText = covertTimeTo12HourFormat(today.sunset);
        })
        .catch((err) => {
            alert("City not found in our database", 2000);
        });
}

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
                                <img src="${iconSrc}" width="72" height="58" 
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
    let ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    let strTime = hour + ":" + minute + " " + ampm;
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
        windIconStatus.innerText = "😆";
        windStatus.innerText = "Tranquility";
        windIconText.innerText = "💚";
    } else if (windSpeed <= 19) {
        windIconStatus.innerText = "😐";
        windStatus.innerText = "Light breeze";
        windIconText.innerText = "💛";
    } else if (windSpeed <= 30) {
        windIconStatus.innerText = "😷";
        windStatus.innerText = "Moderate breeze";
        windIconText.innerText = "🧡";
    } else if (windSpeed <= 39) {
        windIconStatus.innerText = "🤢";
        windStatus.innerText = "Fresh breeze";
        windIconText.innerText = "❤️";
    } else {
        windIconStatus.innerText = "🥵";
        windStatus.innerText = "Strong breeze";
        windIconText.innerText = "💜";
    }
}

// function to get Windgust
function update_Windgust(windgust) {
    if (windgust <= 6) {
        windgustIconStatus.innerText = "😆";
        windgustStatus.innerText = "Tranquility";
        windgustIconText.innerText = "💚";
    } else if (windgust <= 19) {
        windgustIconStatus.innerText = "😐";
        windgustStatus.innerText = "Light breeze";
        windgustIconText.innerText = "💛";
    } else if (windgust <= 30) {
        windgustIconStatus.innerText = "😷";
        windgustStatus.innerText = "Moderate breeze";
        windgustIconText.innerText = "🧡";
    } else if (windgust <= 39) {
        windgustIconStatus.innerText = "🤢";
        windgustStatus.innerText = "Fresh breeze";
        windgustIconText.innerText = "❤️";
    } else {
        windgustIconStatus.innerText = "🥵";
        windgustStatus.innerText = "Strong breeze";
        windgustIconText.innerText = "💜";
    }
}

//function to get uv index status
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
        humidityIconStatus.innerText = "😆"
        humidityStatus.innerText = "Relative";
        humidityIconText.innerText = "💛";
    } else if (humidity <= 80) {
        humidityIconStatus.innerText = "😆"
        humidityStatus.innerText = "Absolute";
        humidityIconText.innerText = "💚";
    } else {
        humidityIconStatus.innerText = "😷"
        humidityStatus.innerText = "Maxima";
        humidityIconText.innerText = "🧡";
    }
}

// function to get visibility status
function update_Visibility(visibility) {
    if (visibility <= 0.03) {
        visibilityIconStatus.innerText = "🥵";
        visibilityStatus.innerText = "Dense Fog";
        visibilityIconText.innerText = "💜";
    } else if (visibility <= 0.16) {
        visibilityIconStatus.innerText = "🤢";
        visibilityStatus.innerText = "Moderate Fog";
        visibilityIconText.innerText = "❤️";
    } else if (visibility <= 0.35) {
        visibilityIconStatus.innerText = "😆";
        visibilityStatus.innerText = "Light Fog";
        visibilityIconText.innerText = "❤️";
    } else if (visibility <= 1.13) {
        visibilityIconStatus.innerText = "😆";
        visibilityStatus.innerText = "Very Light Fog";
        visibilityIconText.innerText = "🧡";
    } else if (visibility <= 2.16) {
        visibilityIconStatus.innerText = "🧡";
        visibilityStatus.innerText = "Light Mist";
        visibilityIconText.innerText = "💛";
    } else if (visibility <= 5.4) {
        visibilityIconStatus.innerText = "😆";
        visibilityStatus.innerText = "Very Light Mist";
        visibilityIconText.innerText = "💛";
    } else if (visibility <= 10.8) {
        visibilityIconStatus.innerText = "😆";
        visibilityStatus.innerText = "Clear Air";
        visibilityIconText.innerText = "💚";
    } else {
        visibilityIconStatus.innerText = "😆";
        visibilityStatus.innerText = "Very Clear Air";
        visibilityIconText.innerText = "💚";
    }
}

// function to get air quality status
function update_Air_Quality(airQuality) {
    if (airQuality <= 30) {
        airQualityIconStatus.innerText = "😆";
        airQualityStatus.innerText = "Good";
        airQualityIconText.innerText = "💚";
    } else if (airQuality <= 60) {
        airQualityIconStatus.innerText = "😐";
        airQualityStatus.innerText = "Qualified";
        airQualityIconText.innerText = "💛";
    } else if (airQuality <= 90) {
        airQualityIconStatus.innerText = "😷";
        airQualityStatus.innerText = "Moderate Pollution";
        airQualityIconText.innerText = "🧡";
    } else if (airQuality <= 120) {
        airQualityIconStatus.innerText = "😨";
        airQualityStatus.innerText = "Least";
        airQualityIconText.innerText = "❤️";
    } else if (airQuality <= 250) {
        airQualityIconStatus.innerText = "🤢";
        airQualityStatus.innerText = "Very Poor";
        airQualityIconText.innerText = "💜";
    } else {
        airQualityIconStatus.innerText = "🥵";
        airQualityStatus.innerText = "Danger";
        airQualityIconText.innerText = "💜";
    }
}

//function to get presure
function update_Pressure(pressure) {
    if (pressure <= 900) {
        pressureIconStatus.innerText = "😆"
        pressureStatus.innerText = "Low";
        pressureIconText.innerText = "💛";
    } else if (pressure <= 1000) {
        pressureIconStatus.innerText = "😆"
        pressureStatus.innerText = "Moderate";
        pressureIconText.innerText = "💚";
    } else {
        pressureIconStatus.innerText = "😐"
        pressureStatus.innerText = "High";
        pressureIconText.innerText = "🧡";
    }
}

//function to get Feel
function update_Feel(feel_like) {
    if (feel_like <= 30) {
        feelIconStatus.innerText = "😐"
        feelStatus.innerText = "Caution";
        feelIconText.innerText = "💛";
    } else if (feel_like <= 37) {
        feelIconStatus.innerText = "😷"
        feelStatus.innerText = "Extreme Caution";
        feelIconText.innerText = "🧡";
    } else if (feel_like <= 66) {
        feelIconStatus.innerText = "🤢"
        feelStatus.innerText = "Danger";
        feelIconText.innerText = "❤️";
    } else {
        feelIconStatus.innerText = "🥵"
        feelStatus.innerText = "Extreme Danger";
        feelIconText.innerText = "💜";
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
    var a,
        b,
        i,
        val = this.value.trim();
    if (!val) {
        return false;
    }
    currentFocus = -1;

    a = document.createElement("ul");
    a.setAttribute("id", "suggestions");

    this.parentNode.appendChild(a);

    for (i = 0; i < cities.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (
            cities[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
        ) {
            /*create a li element for each matching element:*/
            b = document.createElement("li");
            /*make the matching letters bold:*/
            b.innerHTML =
                "<strong>" + cities[i].name.substr(0, val.length) + "</strong>";
            b.innerHTML += cities[i].name.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + cities[i].name + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                search.value = this.getElementsByTagName("input")[0].value;
                removeSuggestions();
            });

            a.appendChild(b);
        }
    }
});
//---------------------- top bottom --------------------------
search.addEventListener("keydown", function (e) {
    var x = document.getElementById("suggestions");
    if (x) x = x.getElementsByTagName("li");
    if (e.keyCode == 40) {
        /*If the arrow DOWN key
          is pressed,
          increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
    } else if (e.keyCode == 38) {
        /*If the arrow UP key
          is pressed,
          decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
    }
});
function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("active");
}
function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
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
        country: "Việt Nam",
        name: "Hà Nội",
        lat: "21.0289",
        lng: "105.855",
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
      //Hà Nội
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
    },
    //An Giang
    {
        "country": "Việt Nam",
        "name": "Long Xuyên",
        "lat": "10.383",
        "lng": "105.433"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Đốc",
        "lat": "10.700",
        "lng": "105.117"
      },
      {
        "country": "Việt Nam",
        "name": "Tân Châu",
        "lat": "10.783",
        "lng": "105.117"
      },
      {
        "country": "Việt Nam",
        "name": "An Phú",
        "lat": "10.683",
        "lng": "105.117"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Phú",
        "lat": "10.287",
        "lng": "105.095"
      },
      {
        "country": "Việt Nam",
        "name": "Phú Tân",
        "lat": "10.883",
        "lng": "105.050"
      },
      {
        "country": "Việt Nam",
        "name": "Thoại Sơn",
        "lat": "10.350",
        "lng": "105.050"
      },
      //Bà Rịa - Vũng Tàu
      {
        "country": "Việt Nam",
        "name": "Bà Rịa - Vũng Tàu",
        "lat": "10.460",
        "lng": "107.170"
      },
      {
        "country": "Việt Nam",
        "name": "Vũng Tàu",
        "lat": "10.345",
        "lng": "107.084"
      },
      {
        "country": "Việt Nam",
        "name": "Bà Rịa",
        "lat": "10.500",
        "lng": "107.167"
      },
      {
        "country": "Việt Nam",
        "name": "Xuyên Mộc",
        "lat": "10.524",
        "lng": "107.300"
      },
      {
        "country": "Việt Nam",
        "name": "Long Điền",
        "lat": "10.677",
        "lng": "107.174"
      },
      {
        "country": "Việt Nam",
        "name": "Đất Đỏ",
        "lat": "10.559",
        "lng": "107.215"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Đức",
        "lat": "10.667",
        "lng": "107.033"
      },
      {
        "country": "Việt Nam",
        "name": "Côn Đảo",
        "lat": "8.692",
        "lng": "106.921"
      },
      //Bắc Giang
      {
        "country": "Việt Nam",
        "name": "Bắc Giang",
        "lat": "21.267",
        "lng": "106.200"
      },
      {
        "country": "Việt Nam",
        "name": "Lục Ngạn",
        "lat": "21.459",
        "lng": "106.094"
      },
      {
        "country": "Việt Nam",
        "name": "Yên Thế",
        "lat": "21.452",
        "lng": "106.159"
      },
      {
        "country": "Việt Nam",
        "name": "Lạng Giang",
        "lat": "21.339",
        "lng": "106.271"
      },
      {
        "country": "Việt Nam",
        "name": "Lục Nam",
        "lat": "21.330",
        "lng": "106.218"
      },
      {
        "country": "Việt Nam",
        "name": "Sơn Động",
        "lat": "21.335",
        "lng": "106.338"
      },
      {
        "country": "Việt Nam",
        "name": "Hiệp Hòa",
        "lat": "21.250",
        "lng": "106.367"
      },
      {
        "country": "Việt Nam",
        "name": "Việt Yên",
        "lat": "21.225",
        "lng": "106.297"
      },
      {
        "country": "Việt Nam",
        "name": "Tân Yên",
        "lat": "21.236",
        "lng": "106.181"
      },
      {
        "country": "Việt Nam",
        "name": "Lục Nam",
        "lat": "21.330",
        "lng": "106.218"
      },
      //Bắc Kạn
      {
        "country": "Việt Nam",
        "name": "Bắc Kạn",
        "lat": "22.133",
        "lng": "105.850"
      },
      {
        "country": "Việt Nam",
        "name": "Ba Bể",
        "lat": "22.530",
        "lng": "105.700"
      },
      {
        "country": "Việt Nam",
        "name": "Chợ Đồn",
        "lat": "22.300",
        "lng": "105.750"
      },
      {
        "country": "Việt Nam",
        "name": "Na Rì",
        "lat": "22.600",
        "lng": "106.000"
      },
      {
        "country": "Việt Nam",
        "name": "Ngân Sơn",
        "lat": "22.900",
        "lng": "105.600"
      },
      {
        "country": "Việt Nam",
        "name": "Pác Nặm",
        "lat": "22.300",
        "lng": "105.850"
      },
      {
        "country": "Việt Nam",
        "name": "Bạch Thông",
        "lat": "22.222",
        "lng": "105.987"
      },
      {
        "country": "Việt Nam",
        "name": "Chợ Mới",
        "lat": "22.383",
        "lng": "105.667"
      },
      //Bạc Liêu
      {
        "country": "Việt Nam",
        "name": "Bạc Liêu",
        "lat": "9.292",
        "lng": "105.722"
      },
      //Bắc Ninh
      {
        "country": "Việt Nam",
        "name": "Bắc Ninh",
        "lat": "21.167",
        "lng": "106.050"
      },
      {
        "country": "Việt Nam",
        "name": "Từ Sơn",
        "lat": "21.080",
        "lng": "105.965"
      },
      {
        "country": "Việt Nam",
        "name": "Quế Võ",
        "lat": "21.144",
        "lng": "106.187"
      },
      {
        "country": "Việt Nam",
        "name": "Yên Phong",
        "lat": "21.114",
        "lng": "106.061"
      },
      {
        "country": "Việt Nam",
        "name": "Gia Bình",
        "lat": "21.129",
        "lng": "106.183"
      },
      //Bến Tre
      {
        "country": "Việt Nam",
        "name": "Bến Tre",
        "lat": "10.233",
        "lng": "106.383"
      },
      {
        "country": "Việt Nam",
        "name": "Ba Tri",
        "lat": "10.109",
        "lng": "106.577"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Thành",
        "lat": "10.234",
        "lng": "106.428"
      },
      {
        "country": "Việt Nam",
        "name": "Chợ Lách",
        "lat": "10.295",
        "lng": "106.130"
      },
      {
        "country": "Việt Nam",
        "name": "Giồng Trôm",
        "lat": "9.877",
        "lng": "106.216"
      },
      {
        "country": "Việt Nam",
        "name": "Mỏ Cày Bắc",
        "lat": "10.219",
        "lng": "106.525"
      },
      {
        "country": "Việt Nam",
        "name": "Mỏ Cày Nam",
        "lat": "9.980",
        "lng": "106.480"
      },
      {
        "country": "Việt Nam",
        "name": "Thạnh Phú",
        "lat": "10.285",
        "lng": "106.177"
      },
      //Bình Định
      {
        "country": "Việt Nam",
        "name": "Bình Định",
        "lat": "13.789",
        "lng": "109.217"
      },
      {
        "country": "Việt Nam",
        "name": "Quy Nhơn",
        "lat": "13.779",
        "lng": "109.219"
      },
      {
        "country": "Việt Nam",
        "name": "An Nhơn",
        "lat": "13.762",
        "lng": "109.156"
      },
      {
        "country": "Việt Nam",
        "name": "Tuy Phước",
        "lat": "13.750",
        "lng": "109.083"
      },
      {
        "country": "Việt Nam",
        "name": "Phù Mỹ",
        "lat": "13.902",
        "lng": "109.038"
      },
      {
        "country": "Việt Nam",
        "name": "Vân Canh",
        "lat": "13.787",
        "lng": "108.978"
      },
      {
        "country": "Việt Nam",
        "name": "Hoài Ân",
        "lat": "13.955",
        "lng": "108.897"
      },
      {
        "country": "Việt Nam",
        "name": "Vĩnh Thạnh",
        "lat": "13.929",
        "lng": "108.973"
      },
      {
        "country": "Việt Nam",
        "name": "Phù Cát",
        "lat": "14.067",
        "lng": "109.167"
      },
      //Bình Dương
      {
        "country": "Việt Nam",
        "name": "Bình Dương",
        "lat": "11.160",
        "lng": "106.817"
      },
      {
        "country": "Việt Nam",
        "name": "Thủ Dầu Một",
        "lat": "11.056",
        "lng": "106.624"
      },
      {
        "country": "Việt Nam",
        "name": "Dĩ An",
        "lat": "10.905",
        "lng": "106.755"
      },
      {
        "country": "Việt Nam",
        "name": "Thuận An",
        "lat": "10.933",
        "lng": "106.746"
      },
      {
        "country": "Việt Nam",
        "name": "Bến Cát",
        "lat": "11.205",
        "lng": "106.588"
      },
      {
        "country": "Việt Nam",
        "name": "Tân Uyên",
        "lat": "11.007",
        "lng": "106.853"
      },
      {
        "country": "Việt Nam",
        "name": "Dầu Tiếng",
        "lat": "11.367",
        "lng": "106.466"
      },
      {
        "country": "Việt Nam",
        "name": "Phú Giáo",
        "lat": "11.240",
        "lng": "107.157"
      },
      // Bình Thuận
      {
        "country": "Việt Nam",
        "name": "Bình Thuận",
        "lat": "10.933",
        "lng": "108.100"
      },
      {
        "country": "Việt Nam",
        "name": "Phan Thiết",
        "lat": "10.929",
        "lng": "108.102"
      },
      {
        "country": "Việt Nam",
        "name": "La Gi",
        "lat": "10.545",
        "lng": "107.780"
      },
      {
        "country": "Việt Nam",
        "name": "Hàm Tân",
        "lat": "11.029",
        "lng": "107.650"
      },
      {
        "country": "Việt Nam",
        "name": "Bắc Bình",
        "lat": "11.250",
        "lng": "108.000"
      },
      {
        "country": "Việt Nam",
        "name": "Tuy Phong",
        "lat": "11.000",
        "lng": "108.300"
      },
      {
        "country": "Việt Nam",
        "name": "Hàm Thuận Bắc",
        "lat": "11.100",
        "lng": "108.000"
      },
      {
        "country": "Việt Nam",
        "name": "Hàm Thuận Nam",
        "lat": "10.900",
        "lng": "108.200"
      },
      {
        "country": "Việt Nam",
        "name": "Đức Linh",
        "lat": "11.200",
        "lng": "107.950"
      },
      {
        "country": "Việt Nam",
        "name": "Hàm Thuận Nam",
        "lat": "10.900",
        "lng": "108.200"
      },
      //Cà Mau
      {
        "country": "Việt Nam",
        "name": "Cà Mau",
        "lat": "9.180",
        "lng": "105.150"
      },
      {
        "country": "Việt Nam",
        "name": "Cái Nước",
        "lat": "9.302",
        "lng": "105.073"
      },
      {
        "country": "Việt Nam",
        "name": "U Minh",
        "lat": "9.249",
        "lng": "105.249"
      },
      {
        "country": "Việt Nam",
        "name": "Đầm Dơi",
        "lat": "9.390",
        "lng": "104.991"
      },
      {
        "country": "Việt Nam",
        "name": "Thới Bình",
        "lat": "9.398",
        "lng": "104.945"
      },
      {
        "country": "Việt Nam",
        "name": "Năm Căn",
        "lat": "9.268",
        "lng": "105.187"
      },
      {
        "country": "Việt Nam",
        "name": "Trần Văn Thời",
        "lat": "9.398",
        "lng": "104.906"
      },
      {
        "country": "Việt Nam",
        "name": "Đầm Dơi",
        "lat": "9.390",
        "lng": "104.991"
      },
      {
        "country": "Việt Nam",
        "name": "Ngọc Hiển",
        "lat": "9.172",
        "lng": "105.244"
      },
      //Cần Thơ
      {
        "country": "Việt Nam",
        "city": "Cần Thơ",
        "districts": [
          {
            "name": "Ninh Kiều"
          },
          {
            "name": "Bình Thủy"
          },
          {
            "name": "Cái Răng"
          },
          {
            "name": "Ô Môn"
          },
          {
            "name": "Thốt Nốt"
          },
          {
            "name": "Vĩnh Thạnh"
          },
          {
            "name": "Cờ Đỏ"
          },
          {
            "name": "Phong Điền"
          },
          {
            "name": "Thới Lai"
          }
        ]
      },
      //Cao Bằng
      {
        "country": "Việt Nam",
        "name": "Cao Bằng",
        "lat": "22.669",
        "lng": "106.250"
      },
      {
        "country": "Việt Nam",
        "name": "Bảo Lâm",
        "lat": "22.824",
        "lng": "106.208"
      },
      {
        "country": "Việt Nam",
        "name": "Bảo Lạc",
        "lat": "22.811",
        "lng": "105.729"
      },
      {
        "country": "Việt Nam",
        "name": "Hà Quảng",
        "lat": "22.855",
        "lng": "106.238"
      },
      {
        "country": "Việt Nam",
        "name": "Thạch An",
        "lat": "22.750",
        "lng": "106.317"
      },
      {
        "country": "Việt Nam",
        "name": "Trùng Khánh",
        "lat": "22.689",
        "lng": "106.376"
      },
      {
        "country": "Việt Nam",
        "name": "Hà Lang",
        "lat": "22.631",
        "lng": "106.599"
      },
      {
        "country": "Việt Nam",
        "name": "Hòa An",
        "lat": "22.495",
        "lng": "106.590"
      },
      {
        "country": "Việt Nam",
        "name": "Quảng Uyên",
        "lat": "22.708",
        "lng": "106.630"
      },
      //Hà Giang
      {
        "country": "Việt Nam",
        "name": "Hà Giang",
        "lat": "22.834",
        "lng": "104.982"
      },
      {
        "country": "Việt Nam",
        "name": "Bắc Quang",
        "lat": "22.400",
        "lng": "105.317"
      },
      {
        "country": "Việt Nam",
        "name": "Quản Bạ",
        "lat": "23.067",
        "lng": "104.850"
      },
      {
        "country": "Việt Nam",
        "name": "Bắc Mê",
        "lat": "22.867",
        "lng": "104.617"
      },
      {
        "country": "Việt Nam",
        "name": "Đồng Văn",
        "lat": "23.366",
        "lng": "105.280"
      },
      {
        "country": "Việt Nam",
        "name": "Hoàng Su Phì",
        "lat": "22.650",
        "lng": "104.666"
      },
      {
        "country": "Việt Nam",
        "name": "Xín Mần",
        "lat": "23.083",
        "lng": "104.433"
      },
      {
        "country": "Việt Nam",
        "name": "Vị Xuyên",
        "lat": "22.759",
        "lng": "104.952"
      },
      {
        "country": "Việt Nam",
        "name": "Quang Bình",
        "lat": "23.036",
        "lng": "105.311"
      },
      //Hà Nam
      {
        "country": "Việt Nam",
        "name": "Hà Nam",
        "lat": "20.542",
        "lng": "105.922"
      },
      {
        "country": "Việt Nam",
        "name": "Phủ Lý",
        "lat": "20.540",
        "lng": "105.921"
      },
      {
        "country": "Việt Nam",
        "name": "Duy Tiên",
        "lat": "20.742",
        "lng": "105.916"
      },
      {
        "country": "Việt Nam",
        "name": "Kim Bảng",
        "lat": "20.673",
        "lng": "105.904"
      },
      {
        "country": "Việt Nam",
        "name": "Lý Nhân",
        "lat": "20.612",
        "lng": "105.890"
      },
      {
        "country": "Việt Nam",
        "name": "Thanh Liêm",
        "lat": "20.454",
        "lng": "105.973"
      },
      //Hà Tỉnh
      {
        "country": "Việt Nam",
        "name": "Hà Tĩnh",
        "lat": "18.357",
        "lng": "105.898"
      },
      {
        "country": "Việt Nam",
        "name": "Hồng Lĩnh",
        "lat": "18.600",
        "lng": "105.700"
      },
      {
        "country": "Việt Nam",
        "name": "Hương Khê",
        "lat": "18.300",
        "lng": "105.650"
      },
      {
        "country": "Việt Nam",
        "name": "Hương Sơn",
        "lat": "18.150",
        "lng": "105.820"
      },
      {
        "country": "Việt Nam",
        "name": "Kỳ Anh",
        "lat": "18.183",
        "lng": "106.217"
      },
      {
        "country": "Việt Nam",
        "name": "Lộc Hà",
        "lat": "18.833",
        "lng": "105.483"
      },
      {
        "country": "Việt Nam",
        "name": "Nghi Xuân",
        "lat": "18.800",
        "lng": "105.933"
      },
      {
        "country": "Việt Nam",
        "name": "Thạch Hà",
        "lat": "18.367",
        "lng": "106.033"
      },
      {
        "country": "Việt Nam",
        "name": "Vũ Quang",
        "lat": "18.717",
        "lng": "105.683"
      },
      //Hải Dương
      {
        "country": "Việt Nam",
        "name": "Hải Dương",
        "lat": "20.937",
        "lng": "106.315"
      },
      {
        "country": "Việt Nam",
        "name": "Chí Linh",
        "lat": "21.141",
        "lng": "106.396"
      },
      {
        "country": "Việt Nam",
        "name": "Nam Sách",
        "lat": "20.867",
        "lng": "106.336"
      },
      {
        "country": "Việt Nam",
        "name": "Kinh Môn",
        "lat": "21.000",
        "lng": "106.200"
      },
      {
        "country": "Việt Nam",
        "name": "Cẩm Giàng",
        "lat": "20.972",
        "lng": "106.245"
      },
      {
        "country": "Việt Nam",
        "name": "Thanh Hà",
        "lat": "20.930",
        "lng": "106.310"
      },
      {
        "country": "Việt Nam",
        "name": "Kim Thành",
        "lat": "20.870",
        "lng": "106.255"
      },
      {
        "country": "Việt Nam",
        "name": "Thanh Miện",
        "lat": "20.945",
        "lng": "106.420"
      },
      {
        "country": "Việt Nam",
        "name": "Gia Lộc",
        "lat": "21.075",
        "lng": "106.145"
      },
      {
        "country": "Việt Nam",
        "name": "Tuần Dương",
        "lat": "20.890",
        "lng": "106.490"
      },
      //Hậu Giang
      {
        "country": "Việt Nam",
        "name": "Hậu Giang",
        "lat": "9.783",
        "lng": "105.466"
      },
      {
        "country": "Việt Nam",
        "name": "Vị Thanh",
        "lat": "9.800",
        "lng": "105.383"
      },
      {
        "country": "Việt Nam",
        "name": "Ngã Bảy",
        "lat": "9.816",
        "lng": "105.466"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Thành A",
        "lat": "9.833",
        "lng": "105.600"
      },
      {
        "country": "Việt Nam",
        "name": "Châu Thành",
        "lat": "9.783",
        "lng": "105.400"
      },
      {
        "country": "Việt Nam",
        "name": "Long Mỹ",
        "lat": "9.767",
        "lng": "105.283"
      },
      {
        "country": "Việt Nam",
        "name": "Phụng Hiệp",
        "lat": "9.666",
        "lng": "105.866"
      }
];