import React, { useRef } from "react";
import { UilWind, UilTemperature, UilTear } from '@iconscout/react-unicons'

import { searchIcon, locationIcon } from "../../Utils/Icons";
import { getImage } from "../../Services/weatherService";
import { ForeCastContiner } from "../ForeCast/ForeCast.container";
import './Home.style.scss'

export const Home: React.FC<any> = (props: any) => {
  const locationSearch: any = useRef()

  const { forecastData } = props

  const renderHeader = () => {

    const { handleSearch, getCurrentWeather } = props
    return (
      <div className="Header-Container">
        <input placeholder="Search for City..." ref={locationSearch} />
        <span className="Icon" onClick={() => handleSearch(locationSearch)}>{searchIcon()}</span>
        <span className="Icon" onClick={() => getCurrentWeather(locationSearch)}>{locationIcon()}</span>
      </div>
    )
  };

  const renderTime = () => {
    const [date, time] = new Date().toLocaleString().split(' ')

    return (
      <>
        <div className="Time-Container">
          <div>
            <span>Date: {date} | Local time: {time}</span>
          </div>
        </div>
        {renderCurrentWeather()}
      </>

    )
  }

  const renderCurrentWeather = () => {
    const { weatherData: { weather = [{}] } } = props
    const { icon = '', description = '' } = weather[0]

    const {
      weatherData: { main: { feels_like, humidity, temp },
        wind: { speed }, name,
        sys: { country } },

    } = props


    return (
      <div className="Current-Weather-Container">
        <div className="Location">{name}, {country}</div>
        <div className="Description">
          {description}
        </div>
        <div className="Current-Weather-Wrapper">
          <div className="Icon-Wrapper">
            <img src={getImage(icon)} alt={description} />
          </div>
          <div className="Weather-Wrapper">
            {`${temp.toFixed()}°`}
          </div>
          <div className="Details" >
            <div className="Details-Wrapper">
              <UilTemperature size={18} />
              Real fell:
              <span>{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className="Details-Wrapper">
              <UilTear size={18} />
              Humidity:
              <span>{`${humidity.toFixed()}%`}</span>
            </div>
            <div className="Details-Wrapper">
              <UilWind size={18} />
              Wind:
              <span>{`${speed.toFixed()} km/h`}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="Home-Container">
        <div className="Home-Wrapper">
          {renderHeader()}
          {renderTime()}
          <ForeCastContiner {...forecastData} />
        </div>

      </div>

    </>

  )
};
