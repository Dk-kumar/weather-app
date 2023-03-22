/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { getformattedWeatherData, getForecastData } from "../../Services/weatherService";
import { Home } from "./Home.component";

export const HomeContainer: React.FC = () => {
  const [weatherData, setWeather]: any = useState({})
  const [forecastData, setForecast]: any = useState({})

  useEffect(() => {
    myGeolocator()
  }, []);


  const handleSearch = async (data) => {
    const searchData = await getformattedWeatherData({ q: data.current.value });
    const { name } = searchData

    const forcastWeather = await getForecastData({ q: name })

    setWeather(searchData)
    setForecast(forcastWeather)

    data.current.value = ""

  }

  const myGeolocator = () => {
    let userLocation = navigator.geolocation;

    if (userLocation) {
      userLocation.getCurrentPosition(success);
    }
  }

  const success = async (data) => {

    const geoLocation = await getformattedWeatherData({ lat: data.coords.latitude, lon: data.coords.longitude })
    const { name } = geoLocation

    const forecastWeather = await getForecastData({ q: name })

    setWeather(geoLocation)
    setForecast(forecastWeather)
  }

  const getCurrentWeather = (data) => {
    myGeolocator()
    data.current.value = ""
  }

  const containerStates = {
    weatherData,
    forecastData
  }

  const containerFunctions = {
    handleSearch: (data) => handleSearch(data),
    getCurrentWeather: (data) => getCurrentWeather(data)
  }
  return (
    <>
      {
        weatherData?.weather?.length > 0 && <div>
          <Home {...containerStates} {...containerFunctions} />
        </div>
      }

    </>

  )
};
