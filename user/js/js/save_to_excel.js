async function SavetoExcel_forecast() {
    try {
        const city = document.getElementById('query').value.trim(); 
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=655e7b267d7fa40c606eb10a3b108bc6`);
        const data = await response.json();

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([['City', 'Date', 'Min Temperature (°C)', 'Max Temperature (°C)', 'Weather', 'Air Pressure', 'Humidity', 'Wind Speed', 'Wind Direction', 'Rain (mm)']]);

        let rowIndex = 1; 
        let currentDate = '';
        

        for (let i = 0; i < data.list.length; i++) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString();

            if (currentDate !== day) {
                const minTemperature = (forecast.main.temp_min - 273.15).toFixed(0); 
                const maxTemperature = (forecast.main.temp_max - 273.15).toFixed(0); 
                const weatherDescription = forecast.weather[0].description;
                const airPressure = forecast.main.pressure; 
                const humidity = forecast.main.humidity; 
                const windSpeed = forecast.wind.speed; 
                const windDirection = forecast.wind.deg; 
                const rain = forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] : 0; 

                XLSX.utils.sheet_add_aoa(worksheet, [[city, day, minTemperature +'°C', maxTemperature +'°C', weatherDescription, airPressure + ' hPa', humidity + '%', windSpeed +' km/h', windDirection + '°', rain + 'mm']], {origin: rowIndex});
                rowIndex++;
                currentDate = day;
            }
        }

        worksheet["!rows"] = [{}, ...Array.from({ length: rowIndex - 1 }, () => ({ hpt: 'auto' }))]; // Cài đặt chiều cao tự động cho hàng

        const style = {
            horizontal: 'center', 
            vertical: 'center', 
            wrapText: true 
        };

        for (let i = 1; i < rowIndex; i++) {
            for (const key of Object.keys(worksheet)) {
                if (key.includes(`${i}`)) {
                    worksheet[key].s = style;
                }
            }
        }

        const today = new Date();
        const fileName = `${city.replace(/ /g, '_').toLowerCase()}(${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()})`;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Forecast');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
        alert('Invalid City Name');
    }
}

async function SavetoExcel_NowDay() {
    try {
        const city = document.getElementById('query').value.trim(); 
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=655e7b267d7fa40c606eb10a3b108bc6`);
        const data = await response.json();

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            ['Date', 'Min Temperature (°C)', 'Max Temperature (°C)', 'Weather', 'Air Pressure (hPa)', 'Humidity (%)', 'Wind Speed (m/s)', 'Wind Direction (°)', 'Rain (mm)'] 
        ]);

        const forecast = data.list[0];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString();

        const minTemperature = (forecast.main.temp_min - 273.15).toFixed(0) +'°C'; 
        const maxTemperature = (forecast.main.temp_max - 273.15).toFixed(0) +'°C'; 
        const weatherDescription = forecast.weather[0].description;
        const airPressure = forecast.main.pressure +'hPa';
        const humidity = forecast.main.humidity +'%'; 
        const windSpeed = forecast.wind.speed +'m/s'; 
        const windDirection = forecast.wind.deg +'°'; 
        const rain = forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] +'mm' : 0 ; 

        const rowData = [day, minTemperature, maxTemperature, weatherDescription, airPressure, humidity, windSpeed, windDirection, rain];
        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: 'A2' });

        worksheet["!rows"] = [{ hpt: 'auto' }]; 
        const style = {
            horizontal: 'center', 
            vertical: 'center', 
            wrapText: true 
        };

        for (const key of Object.keys(worksheet)) {
            if (!key.includes("!")) {
                worksheet[key].s = style;
            }
        }

        const fileName = `${city.replace(/ /g, '_').toLowerCase()}(${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()})`;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Forecast');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
        alert('Invalid City Name');
    }
}

async function SavetoExcel_forecast_basic() {
    try {
        const city = document.getElementById('input_search_id').value.trim(); 
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=655e7b267d7fa40c606eb10a3b108bc6`);
        const data = await response.json();

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([['City', 'Date', 'Min Temperature (°C)', 'Max Temperature (°C)', 'Weather', 'Air Pressure', 'Humidity', 'Wind Speed', 'Wind Direction', 'Rain (mm)']]);

        let rowIndex = 1; 
        let currentDate = '';
        

        for (let i = 0; i < data.list.length; i++) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString();

            if (currentDate !== day) {
                const minTemperature = (forecast.main.temp_min - 273.15).toFixed(0); 
                const maxTemperature = (forecast.main.temp_max - 273.15).toFixed(0); 
                const weatherDescription = forecast.weather[0].description;
                const airPressure = forecast.main.pressure; 
                const humidity = forecast.main.humidity; 
                const windSpeed = forecast.wind.speed; 
                const windDirection = forecast.wind.deg; 
                const rain = forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] : 0; 

                XLSX.utils.sheet_add_aoa(worksheet, [[city, day, minTemperature +'°C', maxTemperature +'°C', weatherDescription, airPressure + ' hPa', humidity + '%', windSpeed +' km/h', windDirection + '°', rain + 'mm']], {origin: rowIndex});
                rowIndex++;
                currentDate = day;
            }
        }

        worksheet["!rows"] = [{}, ...Array.from({ length: rowIndex - 1 }, () => ({ hpt: 'auto' }))]; // Cài đặt chiều cao tự động cho hàng

        const style = {
            horizontal: 'center', 
            vertical: 'center', 
            wrapText: true 
        };

        for (let i = 1; i < rowIndex; i++) {
            for (const key of Object.keys(worksheet)) {
                if (key.includes(`${i}`)) {
                    worksheet[key].s = style;
                }
            }
        }

        const today = new Date();
        const fileName = `${city.replace(/ /g, '_').toLowerCase()}(${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()})`;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Forecast');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
        alert('Invalid City Name');
    }
}

async function SavetoExcel_NowDay_basic() {
    try {
        const city = document.getElementById('input_search_id').value.trim(); 
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=655e7b267d7fa40c606eb10a3b108bc6`);
        const data = await response.json();

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            ['Date', 'Min Temperature (°C)', 'Max Temperature (°C)', 'Weather', 'Air Pressure (hPa)', 'Humidity (%)', 'Wind Speed (m/s)', 'Wind Direction (°)', 'Rain (mm)'] 
        ]);

        const forecast = data.list[0];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString();

        const minTemperature = (forecast.main.temp_min - 273.15).toFixed(0) +'°C'; 
        const maxTemperature = (forecast.main.temp_max - 273.15).toFixed(0) +'°C'; 
        const weatherDescription = forecast.weather[0].description;
        const airPressure = forecast.main.pressure +'hPa';
        const humidity = forecast.main.humidity +'%'; 
        const windSpeed = forecast.wind.speed +'m/s'; 
        const windDirection = forecast.wind.deg +'°'; 
        const rain = forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] +'mm' : 0 ; 

        const rowData = [day, minTemperature, maxTemperature, weatherDescription, airPressure, humidity, windSpeed, windDirection, rain];
        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: 'A2' });

        worksheet["!rows"] = [{ hpt: 'auto' }]; 
        const style = {
            horizontal: 'center', 
            vertical: 'center', 
            wrapText: true 
        };

        for (const key of Object.keys(worksheet)) {
            if (!key.includes("!")) {
                worksheet[key].s = style;
            }
        }

        const fileName = `${city.replace(/ /g, '_').toLowerCase()}(${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()})`;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather Forecast');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
        alert('Invalid City Name');
    }
}