import axios   from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WHEATER_API_KEY;
const CITY_API_KEY = process.env.REACT_APP_CITY_API_KEY;

export async function GetCoordinatesFromCity(cityname="Rio Grande", statecode, countrycode="BR", limit=5) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}${statecode ? ","+statecode : "" }${countrycode ? ","+countrycode : "" }${limit ? "&limit="+limit : "" }&appid=${WEATHER_API_KEY}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function GetWeekForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function GetForecastByCoords(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function GetAllCountries(){
    try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries",{
            headers:{
                "X-CSCAPI-KEY":CITY_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}
export async function GetAllStatesFromCountry(country_iso){
    try {
        const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country_iso}/states`,{
            headers:{
                "X-CSCAPI-KEY":CITY_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}
export async function GetAllCitiesFromState(country_iso,state_iso){
    try {
        const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country_iso}/states/${state_iso}/cities`,{
            headers:{
                "X-CSCAPI-KEY":CITY_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}