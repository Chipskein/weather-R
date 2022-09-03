import React from 'react';
import './index.css';
export default function WeatherPin(props) {
    return (
        <div className='main-div'>
            <div className='div-imagem'>
                <img className='imagem' src={props.WeatherIcon} alt="weather"></img>    
                <p className='currentStatus'>{props.WeatherDescription}</p>
            </div>
            <div className='div-info'>
                <div className='div-temps'>
                    <p className='currentTemp'>{props.WeatherTemp}oC</p>
                    <p>Min-Max</p>
                    <div className='div-min-max'>
                        <p className='currentTempMin'>{props.WeatherTempMin}oC</p>
                        <p className='currentTempMax'>{props.WeatherTempMax}oC</p>
                    </div>
                </div>
                <p className='currentSensation'>Sensation:{props.WeatherSensation}oC</p>
                <p className='currentHumidity'>Humidity:{props.WeatherHumidity}%</p>
            </div>
        </div>
	);
}