import React from "react";
import './index.css';
import {GetCoordinatesFromCity,GetForecastByCoords,GetWeekForecastByCoords} from '../../api'
import { useEffect,useState } from 'react';
import Pin from '../Pin'
import logo from '../../assets/icon.png'
const backgroundImages=[]
        backgroundImages["clear sky"]="https://img3.badfon.ru/original/2560x1600/1/b8/nebo-nebesa-sin-sineva.jpg";
        backgroundImages["few clouds"]="https://bgfons.com/uploads/clouds/clouds_texture2887.jpg";
        backgroundImages["scattered clouds"]="https://getwallpapers.com/wallpaper/full/6/5/4/1009663-cloud-desktop-background-1920x1080-windows-xp.jpg";
        backgroundImages["broken clouds"]="https://wallpapercave.com/wp/wp6932215.jpg";
        backgroundImages["shower rain"]="https://www.yahire.com/blogs/wp-content/uploads/2016/06/rain-shelter.jpg";
        backgroundImages["rain"]="https://wallpapercave.com/wp/wp2519239.jpg";
        backgroundImages["thunderstorm"]="https://wallpapercave.com/wp/wp9722346.jpg";
        backgroundImages["snow"]="https://images.hdqwalls.com/download/forest-winter-snow-3840x2400.jpg";
        backgroundImages["mist"]="https://res.allmacwallpaper.com/get/Retina-MacBook-Air-13-inch-wallpapers/Day-10--unsplashdaily-2560x1600/17491-11.jpg";

function changeBackground(key){
    if(key==null) return;
    const body=document.getElementsByTagName("body")[0]
    body.style.backgroundImage=`url(${backgroundImages[key]})`
}


export default function Home() {
    const [SelectedCity,setSelectedCity] = useState(null);

    const [SelectedCityForecastWeek,setSelectedCityForecastWeek] = useState([]);
    
    const [WeatherIcon, setWeathericon] = useState(null)
    const [WeatherDescription, setWeatherDescription] = useState(null)
    const [WeatherTemp, setWeatherTemp] = useState(null)
    const [WeatherTempMin, setWeatherTempMin] = useState(null)
    const [WeatherTempMax, setWeatherTempMax] = useState(null)
    const [WeatherHumidity, setWeatherHumidity] = useState(null)
    const [WeatherSensation, setWeatherSensation] = useState(null)
    
    async function getCoordinates(){
        const CoordFromCity=await GetCoordinatesFromCity()
        const { name,state,lat,lon,country }=CoordFromCity[0];
        setSelectedCity(
            {
                name,
                state,
                lat,
                lon,
                country
            }
        )   
    }
    async function getForecast(){
        const weekforecast=await GetForecastByCoords(SelectedCity.lat,SelectedCity.lon)
        const temperatures=weekforecast.main
        const weather=weekforecast.weather[0]
      

        setWeathericon(`http://openweathermap.org/img/wn/${weather.icon}@2x.png`);
        setWeatherDescription(weather.description);

        setWeatherHumidity(temperatures.humidity);
        setWeatherSensation(temperatures.feels_like);
        setWeatherTemp(temperatures.temp);
        setWeatherTempMax(temperatures.temp_max);
        setWeatherTempMin(temperatures.temp_min);
    }
    async function getForecastWeek(){
        const weekforecast=await GetWeekForecastByCoords(SelectedCity.lat,SelectedCity.lon)
        const forecasts=[];
        const forecastWeek=weekforecast.list
        const loadedForecast=[];
        let dayCount=1;
        for (let forecast of forecastWeek){
            const forecastDate=new Date(forecast.dt*1000)
            const dayAlreadyLoaded=loadedForecast.find(date=>date===`${forecastDate.getDate()}/${forecastDate.getMonth()+1}/${forecastDate.getFullYear()}`)
            if (dayAlreadyLoaded!=null||dayCount>3) continue;
            const { temp,temp_min,temp_max,humidity,feels_like }=forecast.main
            const { description,icon}=forecast.weather[0]
            forecasts.push(
                {
                    WeatherTemp:temp,
                    WeatherTempMin:temp_min,
                    WeatherTempMax:temp_max,
                    WeatherHumidity:humidity,
                    WeatherSensation:feels_like,
                    WeatherDescription:description,
                    WeatherIcon:`http://openweathermap.org/img/wn/${icon}@2x.png`
                }
            )
            loadedForecast.push(`${forecastDate.getDate()}/${forecastDate.getMonth()+1}/${forecastDate.getFullYear()}`);
            dayCount++
        }
        setSelectedCityForecastWeek(forecasts)
    }
    useEffect(()=>{
        if(SelectedCity==null) return;
        (async ()=>{
            await getForecast()
            await getForecastWeek()
        })() 

    },[SelectedCity])
    useEffect(() => {(async ()=>await getCoordinates())()}, [])
    useEffect(()=>{changeBackground(WeatherDescription)},[WeatherDescription])
    return (
        <div className="App">
            <div className='main-div-container'>
                <div className='div-logo'>
                    <img src={logo} alt="logo" className='logo'/>
                </div>

                <div className='div-weather-now'>
                    <Pin 
                        WeatherIcon={WeatherIcon}
                        WeatherDescription={WeatherDescription}
                        WeatherHumidity={WeatherHumidity}
                        WeatherSensation={WeatherSensation}
                        WeatherTemp={WeatherTemp}
                        WeatherTempMax={WeatherTempMax}
                        WeatherTempMin={WeatherTempMin}
                    />
                </div>
                <div className='div-weather-future'>

                    {
                        SelectedCityForecastWeek.map((forecast,key)=>{
                            return (
                                <Pin
                                    key={key}
                                    WeatherIcon={forecast.WeatherIcon}
                                    WeatherDescription={forecast.WeatherDescription}
                                    WeatherHumidity={forecast.WeatherHumidity}
                                    WeatherSensation={forecast.WeatherSensation}
                                    WeatherTemp={forecast.WeatherTemp}
                                    WeatherTempMax={forecast.WeatherTempMax}
                                    WeatherTempMin={forecast.WeatherTempMin}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
	);
}