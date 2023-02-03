//import { handleOnSearchChange } from './features/search/searchSlice';
import { SearchView } from './features/search/searchView';
import { WeatherView } from './features/weather/weatherView';
import { ForecastView } from './features/forecast/forecastView';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { WEATHER_API_URL, WEATHER_API_KEY } from './app/api';

function App() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);

  const handleOnSearchChange = (searchData: any) => {
    const [lat, lon] = searchData.value.split(' ');

    /*     const currentWeatherFetch = axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    ); 

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const currentWeatherResponse = await response[0];
        const forecastResponse = await response[1];

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('handleOnSearchChange\n', currentWeather, '\n', forecast);*/
  };
  console.log();
  return (
    <div className="App">
      <SearchView onSearchChange={handleOnSearchChange} />
      <WeatherView />
      <ForecastView />
    </div>
  );
}

export default App;
