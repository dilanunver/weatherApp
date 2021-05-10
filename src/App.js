import React, { useEffect, useState } from 'react';
import './App.css';
import data, { getCityDataForSelect } from '../src/data'
import Select from 'react-select'

// const url = 'http://api.openweathermap.org/data/2.5/weather?q=Mersin&appid=84f9b04fac44b3d3edfcb86811e994b4'

function App() {
  const [cities, setCities] = useState(data)
  const [selectedCity, setSelectedCity] = useState('')
  const [userSelectedCity, setUserSelectedCity] = useState('Ankara')
  const [temperature, setTemperature] = useState('')


  const handleSelectCity = async () => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${userSelectedCity}&appid=84f9b04fac44b3d3edfcb86811e994b4`
    const response = await fetch(url)
    const result = await response.json()
    console.log(result.main.temp)
    setSelectedCity(result.name);
    let converter = parseFloat(result.main.temp);
    let tempConverter = (converter - 273.15).toFixed();
    console.log(tempConverter)
    setTemperature(tempConverter)
    // console.log(selectedCity)
  }


  return (
    <div className='select-button'>
      <Select options={getCityDataForSelect}
        onChange={e => setUserSelectedCity(e.value)}
        className='select'
        placeholder='select weather'></Select>
      <button onClick={handleSelectCity}>Search</button>
      <h5>{selectedCity} {temperature} °C </h5>
    </div>
  );
}

export default App;
