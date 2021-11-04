import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay';
import WeatherDisplay from './components/WeatherDisplay';


function App() {

  const api_key = process.env.REACT_APP_API_KEY
  const [ countries, setCountries ] = useState([])
  const [ searchedCountries, setSearchedCountries ] = useState('')
  const [ countryData,setCountryData ] = useState([])
  const [ countryIndex , setCountryIndex] = useState(0)
  const [ displayCountryData , setDisplayCountry] = useState(false)
  const [ weather,setWeather] = useState([])
  const [ displayWeatherData , setDisplayWeather] = useState(false)
  const [ weatherData,setWeatherData] = useState([])

  
  useEffect(() => { 
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {   
        
        setCountries(response.data)
      })
  }, [])
  
  useEffect(() => {
    if(displayCountryData && weather.length<1)
    {axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryData[countryIndex].capital[0]}`)
      .then(response => {   
        
        setWeather([response.data])
        
      },[])}
  })
  

  let i = 0;
  const len = countries.length;
  let nameOfCountries = []
  for (; i < len; ) {
    nameOfCountries.push(countries[i].name.common)
    i++;
  }
  
  const countriesToShow = searchedCountries ? 
  (nameOfCountries.filter(country => 
    country.toLowerCase().includes(searchedCountries.toLowerCase())).length==1)?
    nameOfCountries.filter(country => 
      country.toLowerCase().includes(searchedCountries.toLowerCase())):
  (nameOfCountries.filter(country => 
    country.toLowerCase().includes(searchedCountries.toLowerCase())).length<11
    ?nameOfCountries.filter(country => 
      country.toLowerCase().includes(searchedCountries.toLowerCase())):[]) : []
  
  
  
  let countrydatatest = []
  for(let m = 0;m<countriesToShow.length;){
    let j = 0;
    for (; j < len; ) {
      
        if((countriesToShow[m] == countries[j].name.common) && (countrydatatest.indexOf(countries[j]) == -1) ){
          countryData.push(countries[j])
        }
      
      j++;
    }
    m++;
  }
  
  
  // if (!searchedCountries){
  //   setDisplayCountry([])
  // }
  // setDisplayCountry(displayCountryData)
  const handleSearchedCountries = (event) => {
    setSearchedCountries(event.target.value)
    if(countrydatatest.length>0){
      setCountryData(countrydatatest)
      countrydatatest=[]
    }else{
      setCountryData([])
      countrydatatest=[]
    }
  }

  const handleShowButton = (e) => {
    // let indexCountries = countriesToShow.map(country=>countriesToShow.indexOf(country))
    // setCountryIndex(countriesToShow.indexOf(country))
    setCountryIndex(e.target.getAttribute("data-index"))
    setDisplayCountry(!displayCountryData)
    
    
  }

  const handleShowWeatherButton = () => {
    // let indexCountries = countriesToShow.map(country=>countriesToShow.indexOf(country))
    // setCountryIndex(countriesToShow.indexOf(country))
    setDisplayWeather(!displayWeatherData)
    setWeatherData(weather)
  }
  return (
    <div>
      <strong>Filter Shown with : </strong><input value={searchedCountries} onChange={handleSearchedCountries}/>
      <h2>Searched Countries</h2>
      <div>
            {countriesToShow.map(country=>
            <p key={countriesToShow.indexOf(country)}>{country}<button key={countriesToShow.indexOf(country)} data-index={countriesToShow.indexOf(country)} onClick={handleShowButton}>Show</button> </p>
        )}
      </div>
      
        <h1>Country Display</h1>
        {/* <button onClick={() => setDisplayCountry(!displayCountryData)}>Display</button> */}
        <CountryDisplay countryData={countryData} displayCountryData={displayCountryData} countryIndex={countryIndex} handleShowWeatherButton={handleShowWeatherButton}/>
        <WeatherDisplay countryData={countryData} countryIndex={countryIndex} weatherData={weatherData} displayWeatherData={displayWeatherData} />
        
        {/* <p>{displayCountryData[0].name} {displayCountryData[0].capital}</p>
        <img src={displayCountryData[0].flag.png}/> */}
      
      </div>
  )
}


export default App;
