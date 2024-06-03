import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/WeatherCiudad.css';


export const WeatherCiudad = ({setCoord, setTemperaturas}) => {


  //este useState(Next) lo utilizamos para cargar la ciudad que escriben en el inpt
  const [ Next, setNext ] = useState();

   //este lo utilizamos para controlar el error que no escriban numero o cualquier cractar espeacial. 
   const [ SearchError, setSearchError ] = useState(true);

let texto = useRef()
//esta funcion la utilizamos para buscar sacar lo del input.value.
const Buscar = (even) =>{

  even.preventDefault()
//convertimos todo lo que escribimos a minisculas
 let text = (texto.current.value).trim().toLowerCase();
//esta es una expresion regular que nos ayuda a restringir que no escriban numero o cualquier caracter especial
//debe ser solo texto
 const texto_text = /[A-Za-z]/; 

 //esta condicion con el operador ternario nos ayuda a verificar si es verdadero es porque solo se incluyo texto
 (texto_text.test(text)) ? setNext(text) :
  setSearchError(false)
  texto.current.style.borderColor='#ff0000';
  texto.current.value='';
  return
  
 }

  
  useEffect( () => {

   if(Next){
    
    const key='bd3134cf1afc64371140fba68a2e73bb';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Next}&appid=${key}`)

    .then( respuesta => { 
            setCoord(respuesta.data)
            setSearchError(true)
            let Celsius = (respuesta.data.main.temp - 273.15).toFixed(2);
            let Fahrenheit = ((Celsius * 9/5) + 32).toFixed(2);   
            setTemperaturas(temp => [Celsius, ...temp])
            setTemperaturas(temp => [Fahrenheit, ...temp])
            texto.current.style.borderColor=''
   })
    .catch(error => {
      console.error(),  
      setSearchError(false)
   });    
    
   }
  },[Next])



  return (
    <>
      <div className='caja-busqueda'>
      <input type='text' ref={texto} placeholder='Busqueda por ciudad' required/>
     
      <i class='bx bx-search-alt-2' onClick={Buscar}></i>
      </div>
      <div className='caja-error'>
        {
          (SearchError)? console.log()
         :<h3>¡¡La Ciudad {Next} No encontrada!!</h3>
        }
      </div>
    </>
  )
}


