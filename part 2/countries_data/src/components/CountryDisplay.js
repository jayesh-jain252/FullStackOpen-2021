import React, { useState, useEffect } from 'react'
import axios from 'axios'


function CountryDisplay(props) {
    
    
    if(props.displayCountryData){
        
        
        return (
            <div>
                <h1>Name:{props.countryData[props.countryIndex].name.common}</h1>
                <p>Region: {props.countryData[props.countryIndex].region}</p>
                <p>Capital: {props.countryData[props.countryIndex].capital[0]}</p>
                {/* <img src={props.countryData[0].flag.png}/> */}
                <h3>Languages</h3>
                <div>
                    {Object.values(props.countryData[props.countryIndex].languages).map(
                        language =>
                        <p key={language}>{language}</p>

                    )}
                </div>
                <div  style={{padding: "10px"}}>
                    <img  style={{height:"150px"}} src={props.countryData[props.countryIndex].flags.png} alt="flag of the country"/>
                </div>
                <h2>Weather <button onClick={props.handleShowWeatherButton}>Show Weather</button></h2>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default CountryDisplay
