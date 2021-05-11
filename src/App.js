import React, { useEffect, useState } from 'react';
import './App.css';
import data, { getCityDataForSelect } from '../src/data'
import Select from 'react-select'


// const url = 'http://api.openweathermap.org/data/2.5/weather?q=Mersin&appid=84f9b04fac44b3d3edfcb86811e994b4'

function App() {
  const [cities, setCities] = useState(data)
  const [selectedCity, setSelectedCity] = useState('')
  const [userSelectedCity, setUserSelectedCity] = useState('Ankara')
  const [temperature, setTemperature] = useState('0')
  const [desc, setDesc] = useState('clear')
  const [date, setDate] = useState(new Date())


  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer)
    }
  })

  const handleSelectCity = async () => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${userSelectedCity}&appid=84f9b04fac44b3d3edfcb86811e994b4`
    const response = await fetch(url)
    const result = await response.json()
    setSelectedCity(result.name);
    let converter = parseFloat(result.main.temp);
    let tempConverter = (converter - 273.15).toFixed();
    setTemperature(tempConverter)
    console.log(result.weather)
    setDesc(result.weather[0].main)

  }




  return (
    <div className='all-info'>
      <div className='select'>
        <Select options={getCityDataForSelect}
          onChange={e => setUserSelectedCity(e.value)}
          className='select-select'
          placeholder='select weather'></Select>
        <button className='select-button' onClick={handleSelectCity}>Search</button>
      </div>
      <div className='info'>
        <h3 className='city'>{selectedCity} </h3>
        <div className='time-date'>
          <p className='time'>{date.toLocaleTimeString()}</p>
          <p >{date.toLocaleDateString()}</p>
        </div>
        <p className='desc'>{desc}</p>
        <p className='temp'>{temperature}° </p>



      </div>

    </div>
  );
}

export default App;
