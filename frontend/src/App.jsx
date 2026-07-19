import { useEffect, useState } from 'react';
import "./App.css";
import { getWeatherData } from './api';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather.jsx'
import HourlyForecast from './components/HourlyForecast.jsx'
import WeeklyForecast from './components/WeeklyForecast.jsx'
import { parse } from 'date-fns'

const getGradientClass = (hour) => {

  if (hour >= 6 && hour < 9) return 'bg-sunrise'
  if (hour >= 9 && hour < 17) return 'bg-day'
  if (hour >= 17 && hour < 20) return 'bg-sunset'
  return 'bg-night'
}




function App() {
  const [city, setcity] = useState('India')

  const [weatherdata, setweatherdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('')

  const hour = weatherdata?.location?.localtime ?
    parse(weatherdata.location.localtime,
      'yyyy-MM-dd HH:mm',
      new Date()
    ).getHours()
    : new Date().getHours();


  const gradientClass = getGradientClass(hour);



  useEffect(() => {
    const fetchWeather = async () => {
      setloading(true);
      seterror('');
      try {
        const data = await getWeatherData(city)
        console.log(data)

        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day

        setweatherdata({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        })

      } catch (e) {
        console.error(e)
        seterror(e.message)
      } finally {
        setloading(false)
      }
    }

    fetchWeather();
  }, [city])


  console.log(weatherdata);


  return (
    <div className={`app ${gradientClass}`}>
      <div className="container">
        <SearchBar onSearch={setcity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherdata && (
          <>
            <div className="top-section">

              <CurrentWeather data={weatherdata.current}
                location={weatherdata.location} />
                 </div>
              <HourlyForecast data={weatherdata.hourly} />
              <WeeklyForecast data={weatherdata.weekly} />
            </>
         
        

      )}

      </div>
    </div>
  )

}
export default App
