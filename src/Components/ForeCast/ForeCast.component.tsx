import React from "react";
import { getImage } from "../../Services/weatherService";

import "./ForeCast.style.scss"


export const ForeCast: React.FC<any> = (props) => {

    const tConvert = (time) => {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { 
          time = time.slice (1);  
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
          time[0] = +time[0] % 12 || 12;
        }
        return time.join ('');
      }
      

    const renderForeCast = () => {

        const { list } = props
        const sliceList = list.slice(0, 5)
        console.log(sliceList)
        return (
            <div className="Forecast-Wrapper">
                {
                    sliceList.map(res => {
                        const [, time] = res.dt_txt.split(" ")
                        return (
                            <div className="Forecast-Details">
                                <span>{tConvert(time)}</span>
                                <div className="Forecast-Image">
                                    <img src={getImage(res.weather[0].icon)} alt={res.weather[0].description} />
                                </div>
                                <span>{res.weather[0].main} {res.main.temp}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className="Forecast-Container">
            <p className="Title">Forecast List</p>
            {renderForeCast()}
        </div>
    )
}