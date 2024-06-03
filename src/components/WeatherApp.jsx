import React, { useState } from 'react'
import './css/weather.css';

export const WeatherApp = ({Data,Temperaturas}) => {

    const [Change, setChange] = useState(true)

 
    const CambiarTemperatura = () =>{
        (Change)? setChange(false):setChange(true)    
    }

    
  
  return (
    <>
   
     <div className='contendor-contendio'>
            
        <div className='caja-header'>
            <h2>{Data?.name},{Data?.sys.country}</h2>
            <p>" {Data?.weather[0].main}, {Data?.weather[0].description} "</p>
        </div>
        
        <div className='weather-tiempo'>
                <div className='conten-imagen-clima'>
                    <img src ={`https://openweathermap.org/img/wn/${Data?.weather[0]?.icon}@4x.png`}/>
                </div>

                <ul className='weather-list'>
                    <li className='items-list'><span>Wind Speed:</span> <span>{Data?.wind?.speed} m/s</span></li>
                    <li className='items-list'><span>Clouds:</span> <span>{Data?.clouds.all} %</span></li>
                    <li className='items-list'><span>Pressure:</span> <span> {Data?.main.pressure} hPa</span></li>
                    <li className='items-list'><span>humidity:</span> <span> {Data?.main.humidity} %</span></li>
                </ul>
        </div>
        <div className='caja-temperatura'>
            {(Change)?
            
            <p className='temperatura'>{Temperaturas[1]} °C</p>
            :<p className='temperatura'>{Temperaturas[0]} °F</p>
            }
            <button className='btn' onClick={CambiarTemperatura}>Change to {(!Change)? Temperaturas[1] +' '+ '°C' : Temperaturas[0]+' ' + '°F' }</button>
        </div>



     </div>
      
    </>
  )
}


