import React from 'react'

function WeatherDisplay(props) {
    
    if(props.displayWeatherData){

        return (
            <div>
                <p>Temperature : {props.weatherData[0].current.temperature}</p>
                <p>Weather : {props.weatherData[0].current.weather_descriptions[0]}</p>
                <div>
                    <img src={props.weatherData[0].current.weather_icons[0]} alt="weather Icon"/>
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default WeatherDisplay
