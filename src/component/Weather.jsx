import React, { useEffect, useState } from 'react';
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');  // state for managing city name
    const [inputCity, setInputCity] = useState(''); // state for search input

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            console.log("API Key from ENV:", import.meta.env.VITE_APP_ID);

            const response = await fetch(url);
            const data = await response.json();

            let imagePath = '';
            if (data.weather[0].main === "Clouds") {
                imagePath = cloud;
            } else if (data.weather[0].main === "Clear") {
                imagePath = clear;
            } else if (data.weather[0].main === "Rain") {
                imagePath = rain;
            } else if (data.weather[0].main === "Drizzle") {
                imagePath = drizzle;
            } else if (data.weather[0].main === "Mist") {
                imagePath = snow;
            } else {
                imagePath = cloud;
            }

            console.log(data);

            setWeatherData({
                location: data.name,
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                icon: imagePath,
            });

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleSearchClick = () => {
        if (inputCity) {
            setCity(inputCity);  // update city state with the input value
        }
    };

    useEffect(() => {
        search(city);  // call search whenever city changes
    }, [city]);  // this effect will trigger whenever the 'city' changes

    return (
        <>
            <div className='weather_app   flex flex-col justify-center items-center rounded-3xl p-5 sm:p-10'>
                <h1 className='font-medium text-white text-center pb-5 text-2xl  sm:text-4xl artifika-regular'>Weather App</h1>

                {/* -------------------------Search------------------------------ */}
                <div className="search flex justify-center items-center gap-2 sm:gap-5">
                    <input 
                        type="text" 
                        value={inputCity} 
                        onChange={(e) => setInputCity(e.target.value)} 
                        placeholder='Enter the city' 
                        className='outline-none rounded-xl  px-5 py-2 sm:px-10 sm:py-3 sm:rounded-2xl'
                    />
                    <div 
                        className='border-2   rounded-full bg-white cursor-pointer  h-11 w-11   sm:h-12 sm:w-12 p-3' 
                        onClick={handleSearchClick}
                    >
                        <img src={search_icon} alt="Search" className='h-[100%] w-[100%]' />
                    </div>
                </div>

                {/* ---------------------------Climate and Temperature-------------------- */}
                {weatherData && (
                    <div className="climate_temperature flex flex-col justify-center items-center">
                        <div className="climate h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]">
                            <img src={weatherData.icon} alt="Weather Icon" className='h-[100%] w-[100%]' />
                        </div>
                        <div className="temperature text-white text-center  font-bold text-3xl sm:text-5xl">
                            <p>{weatherData.temperature}°C</p>
                            <p>{weatherData.location}</p>
                        </div>
                    </div>
                )}

                {/* -------------------------Weather Data----------------------------------- */}
                {weatherData && (
                    <div className="weather_data flex gap-10 pt-10 justify-center items-center">
                        <div className='col text-white flex flex-col justify-center items-center'>
                            <div>
                                <img src={humidity} alt="Humidity" />
                            </div>
                            <p>{weatherData.humidity}%</p>
                            <p>Humidity</p>
                        </div>

                        <div className='col text-white flex flex-col justify-center items-center'>
                            <div>
                                <img src={wind} alt="Wind Speed" />
                            </div>
                            <p>{weatherData.windspeed} m/s</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Weather;
