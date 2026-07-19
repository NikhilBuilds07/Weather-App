import './CurrentWeather.css'
import { format,parse } from 'date-fns';


const getWindDescription = (value) =>{
    if(value <10 ) return 'Calm'
    if(value <20) return 'A little breezy'
    if(value <30) return 'Windy'
    return 'Very Windy'
}

    const getHumidityDescription = (value) =>{
        if(value < 30) return 'Dry'
        if(value <60) return 'Comfortable'
        if(value <80 ) return 'Humid'
        return 'Sticky'

    }

    const getUVDescription = (value) =>{
        if(value < 3) return 'Low'
        if(value < 6) return "Moderate"
        if(value < 8) return "High"
        if(value < 11) return 'Very High'
        return 'Extreme'
    }

const getDayAndHHMM = (rawdata) =>{
    const date = parse(rawdata, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a')
}

const CurrentWeather = ({ data, location }) => {
    const { localtime, name } = location;
    const { temp_c, condition, feelslike_c, maxtemp_c, mintemp_c, wind_kph, humidity, uv } = data;
    return (
        <div className="current-weather-wrapper">
            <div className="card left-card">
                <div>
                    <h2 className='city'>{name}</h2>
                    <h1 className='temp'>{Math.round(temp_c)}&deg;</h1>
                    <p className='max_min'>
                        {Math.round(maxtemp_c)}{'\u00b0'} / {Math.round(mintemp_c)}{'\u00b0'}
                    </p>
                    <p className='feels'>Feels like {feelslike_c}{'\u00b0'}</p>
                    <p>{getDayAndHHMM(localtime)}</p>
                </div>
                    <div className="condition">
                        <img  src={`https:${condition.icon}`} alt={condition.text} />
                        <h2 className='condition-text'>{condition.text}</h2>
                    </div>
            </div>
            <div className="card right-card">
                <div className="detail-item">
                    <span className='detail-label'>Wind</span>
                    <span className='detail-value'>{wind_kph} km/h <br />
                    <small>{getWindDescription(wind_kph)}</small></span>
                </div>
                <div className="detail-item">
                    <span className='detail-label'>Humidity</span>
                     <span className='detail-value'>{humidity} % <br />
                    <small>{getHumidityDescription(humidity)}</small></span>
                </div>
                <div className="detail-item">
                    <span className='detail-label'>UV Index</span>
                     <span className='detail-value'>{uv} <br />
                    <small>{getUVDescription(uv)}</small></span>
                </div>
               
            </div>
        </div>

    )
}
export default CurrentWeather