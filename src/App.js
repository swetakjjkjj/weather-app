import { useEffect, useState } from 'react';
import './App.css';
import LocationSearch from './LocationSearch';
import WeatherDay from './WeatherDay';
import API_KEY from './API_KEY';

function App() {
  //const location= "Patna"
  //const apiKey="fXljYlmVq1BGxh325jNexqXVV5hDuSlr"
  //const locationKey="152909_PC"
  const [locationKey,setLocationKey] = useState('')
  const [weatherInfo,setWeatherInfo] = useState([])
  const [location, setLocation] = useState('')
  
  const padNum =(num) =>{
    const stringNum= num +''
    const stringLen= stringNum.length
    if (stringLen === 1){
      return '0' + stringNum; // 4  -> 04
    }else{
      return stringNum; // 17 -> 17
    }
  }
  
  //To fetch the location key we can use below:
  //fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${locationKey}`)

  //http://dataservice.accuweather.com/forecasts/v1/daily/10day/${locationKey}?apikey=${API_KEY}
  useEffect(()=> {
    if (locationKey){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
    .then(res=>res.json())
    .then(res=> {
      console.log(res)
      console.log(daysOfWeek[new Date(res.DailyForecasts[0].Date).getDay()]);
      setWeatherInfo(res.DailyForecasts.map(df=>{
        return{
          max: df.Temperature.Maximum.Value,
          min: df.Temperature.Minimum.Value,
          weatherType:df.Day.IconPhrase,
          weatherKey: padNum(df.Day.Icon),
          daysOfWeek: daysOfWeek[(new Date(df.Date).getDay())],
      }}
      ))
    })
  }},[locationKey])

  useEffect(()=>{console.log(weatherInfo)},[weatherInfo])

  const [toggleUnit,setToggleUnit] = useState(false)
  const togglefunction =(min,max) =>{
        if (toggleUnit===true){
            min = ((min-32)*5/9).toFixed(2)
            max = ((max-32)*5/9).toFixed(2)
        }
        return ({min: min,max: max})
      }

  return (
    <div>
      <div className='weatherBg'>
      <h1 className='heading'>WEATHER APP</h1>
      <LocationSearch onCityFound={cityInfo=>{
        //console.log('FOUND', cityInfo)
        setLocationKey(cityInfo.key)
        setLocation(cityInfo.name + ", " + cityInfo.state)
      }}/>
      <div className='mt-4 border px-3'>
        <input type="radio" name="Unit" defaultChecked onClick={()=>setToggleUnit(true)}/> Metric
        <span> </span>
        <input type="radio" name="Unit" onClick={()=>setToggleUnit(false)} /> Imperial
      </div>
      </div>
      <div className='forecastBg'>
      <h2 className='location'>{location}</h2>
      <div className='weather-Info flex'>
      {!!weatherInfo &&  weatherInfo.map((i,index)=>(
        <div key={index}>
          <WeatherDay weatherType={i.weatherType} weatherKey={i.weatherKey} daysOfWeek={i.daysOfWeek} togglefunction={togglefunction(i.min,i.max)}/>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}
//<button onClick={()=>setToggleUnit(!toggleUnit)}>{Unit}</button>
export default App;
