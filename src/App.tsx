import { SearchView } from './features/search/searchView';
import { WeatherView } from './features/weather/weatherView';
import { ForecastView } from './features/forecast/forecastView';
import './App.css';
import { getBrowserGeolocation } from './app/geolocation';
import { useAppDispatch } from './app/hooks';
import { fetchForecast } from './features/forecast/forecastSlice';
import { fetchWeatherData } from './features/weather/weatherSlice';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<string>(getBrowserGeolocation());

  if (location) {
    console.log('Valid location', location);
    dispatch(fetchWeatherData(location));
    dispatch(fetchForecast(location));
  } else {
    console.log('Invalid location. Fatching placeholder');
  }

  return (
    <div className="App">
      <SearchView />
      <WeatherView />
      <ForecastView location={location} />
    </div>
  );
}

export default App;
