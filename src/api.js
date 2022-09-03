import axios   from 'axios';

const API_KEY = process.env.REACT_APP_WHEATER_API_KEY;

export async function GetCoordinatesFromCity(cityname="Rio Grande", statecode, countrycode="BR", limit=5) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}${statecode ? ","+statecode : "" }${countrycode ? ","+countrycode : "" }${limit ? "&limit="+limit : "" }&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function GetWeekForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function GetForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        return null;
    }
}