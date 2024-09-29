import React, { useState } from "react";
import './App.css'
import { fetchWeather } from "./API/fetchWeather";



function App () {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});


    const search = async(e) => {
        if(e.key === "Enter"){
            const data = await fetchWeather(query);
            console.log(data);
            setWeather(data);
            setQuery('');
        }
    }
    return (
        <div className="main-container">
            <input 
                type="text" 
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {
                weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>
                                {weather.name}
                            </span>
                            <sup>
                                {weather.sys.country}
                            </sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(weather.main.temp)}
                            <sup>
                                &deg;C
                            </sup>
                        </div>
                        <div className="add">
                            <span>feels like  </span>
                            {Math.round(weather.main.feels_like)}
                            <sup>
                                &deg;C
                            </sup>
                        </div>
                        <div className="info">
                            <img
                                className="city-icon" 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description} 
                            />
                            <p>
                                {weather.weather[0].description}
                            </p>
                        </div>
                    </div>
                )
            }
            {
                weather.main && (
                    <div className='coord'>
                        <h3>
                            Coordinates
                        </h3>
                        <span>
                            Longitude : {weather.coord.lon}
                        </span>
                        <span>
                            Latitude : {weather.coord.lat}
                        </span>
                    </div>
                )
            }
        </div>
    )
}
export default App;