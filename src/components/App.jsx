import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WeatherApp } from './WeatherApp';
import './css/App.css';
import { WeatherCiudad } from './WeatherCiudad';




export const App = () => {

  //stado para cargar la Api
  const  [ Coord , setCoord ] = useState();


//estado para cargar las latitude, longitude;
  const [ Ubicacion, setUbicacion] = useState([]);

//este useState(Temperaturas) lo utilizamos para realizar el la conversion de la temperatura. 
  const [Temperaturas , setTemperaturas] = useState([]);

//Este se utiliza para mostrar la imagen cuando carga la pagina....
  const [ Loading , setLoading ] = useState(false)

//funtion donde cargamos el setUbicacion
  const success =(pos)=>{  

    const { latitude, longitude } = pos.coords;   
        
        setUbicacion(x => [latitude, ...x] )
        setUbicacion(x => [longitude, ...x] )  

  }
  //este useEffect es donde realizamos la peticion hacia la funcion success()
  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(success);
    
    
      },[])
   
      //Este useEffect() lo utilizamos para realizar la peticion a la Api pero tamnbien controlamos que se haya cargado la latitude, longitude
      useEffect(() =>{
   //SE EJECUTA SI EL useState(Ubicacion) actualiza su estado el if(Ubicacion)
      if(Ubicacion){

          const key='bd3134cf1afc64371140fba68a2e73bb'    
          const url=`https://api.openweathermap.org/data/2.5/weather?lat=${Ubicacion[1]}&lon=${Ubicacion[0]}&appid=${key}`
          axios.get(url)
          .then( respuesta => {
            
            setCoord(respuesta.data)
            //realizamos la conversion del celcios al fahrenheit
            let Celsius = (respuesta.data.main.temp - 273.15).toFixed(2);
            let Fahrenheit = ((Celsius * 9/5) + 32).toFixed(2);
            setTemperaturas(temp => [Celsius, ...temp])
            setTemperaturas(temp => [Fahrenheit, ...temp])
            
            
          })         
                     
          .catch(error => console.log('Pagina actualizada'))
         

        }
        

      },[Ubicacion])

//este useEffect es para controlar el tiempo  que carga donde sale el sol
      useEffect( ()=>{
        
           setTimeout(()=>{
            
            setLoading(true)

           },"3000")

      },[])


   

  return (
    <>
    <div className='contenedor-principal'>
      <h1 className='title'>Weather App</h1>
      <WeatherCiudad
      setCoord = { setCoord }
      setTemperaturas = { setTemperaturas }
      
      />
      {
       
      (!Loading)? <img src='./img/pocas-nubes.gif' width='200px' height='200px'/>
      :     
     
      <WeatherApp
      Data={Coord}
      Temperaturas={Temperaturas}
      />
    
    }
    </div>
    </>
  )
}


