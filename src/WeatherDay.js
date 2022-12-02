import './App.css';

function WeatherDay({weatherType, weatherKey,daysOfWeek, togglefunction}){
        
        //°C or °F
    return(
        <>
        <div className="day">
            <div>{daysOfWeek}</div>
            <img src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`} alt={weatherType}/>
            <div>{togglefunction.max}° / {togglefunction.min}°</div>
            <div></div>
        </div>
        </>
    )
}

export default WeatherDay;