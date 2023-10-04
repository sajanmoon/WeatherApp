import React, { useState, useEffect } from 'react'
import "./WeatherApp.css"

const WeatherApp = () => {
    const [city, setCity] = useState("")
    const [search, setSearch] = useState("")
    const [searchValue, setSearchValue] = useState("London");

    const getWeather = async () => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=e7badfb125aed48f90506b68715ded6f&units=metric`
        const response = await fetch(url);
        const respJson = await response.json();
        setCity(respJson)
        setSearch(respJson ? searchValue : respJson);
    }

    const getWeatherImage = temp => {
        if (temp > 25) {
            return "/images/clear.png";
        } else if (temp > 15) {
            return "/images/cloud.png";
        } else {
            return "/images/drizzle.png";
        }
    };

    useEffect(() => {
        getWeather();
    }, []);



    return (
        <>
            <div className="container">
                <div className="inputBox">
                    <input type="text" placeholder='Enter city' name="search"
                        value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} required />
                    <button onClick={getWeather}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                {city.name && (

                    <div className="info">
                        <img className='img' src={getWeatherImage(city.main && city.main.temp)} alt="cloud" />
                        <h1 className="temp">{city.main && city.main.temp}°C</h1>
                        <h1 className='location'>{search}</h1>


                        <div className="data-container">
                            <div className="data">
                                <i className="fa-solid fa-droplet"></i>
                                <div className="text">Humidity</div>
                                <div className="humidity">{city.main && city.main.humidity}%</div>

                            </div>
                            <div className="data">
                                <i className="fa-solid fa-wind"></i>
                                <div className="text">Wind Speed</div>
                                <div className="wind-speed">{city.wind && city.wind.speed}m/s</div>

                            </div>
                        </div>
                    </div>
                )
                }
            </div >

        </>
    )
}

export default WeatherApp
