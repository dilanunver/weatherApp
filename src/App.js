import React, { useEffect, useState } from 'react';
import './App.css';
import { getCityDataForSelect } from '../src/data'
import Select from 'react-select'
import ClearImage from './images/pexels-darius-krause-2931915.jpg';
import CloudsImage from './images/pexels-ruvim-3560044.jpg';
import RainImage from './images/pexels-sid-ali-2028885.jpg';
import SnowImage from './images/pexels-zhaocan-li-1755243.jpg';



function App() {
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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userSelectedCity}&appid=84f9b04fac44b3d3edfcb86811e994b4`
    const response = await fetch(url)
    const result = await response.json()
    let str = 'Province';
    if (result.name.includes(str)) {
      let lastIndex = result.name.lastIndexOf(' ');
      result.name = result.name.substring(0, lastIndex);
    }
    setSelectedCity(result.name);

    let converter = parseFloat(result.main.temp);
    let tempConverter = (converter - 273.15).toFixed();
    setTemperature(tempConverter)
    setDesc(result.weather[0].main)
  }

  useEffect(() => {
    const lowerCaseDesc = desc.toLowerCase();
    if (lowerCaseDesc === 'clear') {
      document.body.style.backgroundImage = `url(${ClearImage})`;
    }
    if (lowerCaseDesc === 'clouds') {
      document.body.style.backgroundImage = `url(${CloudsImage})`;
    }
    if (lowerCaseDesc === 'rain') {
      document.body.style.backgroundImage = `url(${RainImage})`;
    }
    if (lowerCaseDesc === 'snow') {
      document.body.style.backgroundImage = `url(${SnowImage})`;
    }
  }, [desc]);

  return (
    <div className='all-info'>
      <div className='time-date'>
        <p className='time'>{date.toLocaleTimeString()}</p>
        <p >{date.toLocaleDateString()}</p>
      </div>
      <div className='select'>

        <Select options={getCityDataForSelect}
          onChange={e => setUserSelectedCity(e.value)}
          className='select-select'
          placeholder='select weather'></Select>
        <button className='select-button' onClick={handleSelectCity}>Search</button>
      </div>
      <div className='info'>
        <h3 className='city'>{selectedCity} </h3>
        <p className='temp'>{temperature}° </p>
        <p className='desc'>{desc}</p>
      </div>
    </div>
  );
}

export default App;
