import { useEffect, useState } from 'react';
import { fetchWeatherData } from './weatherSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { current } from '@reduxjs/toolkit';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../app/api';
import { fetchOptions } from '../search/searchSlice';

export const WeatherView = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWeatherData());
  }, []);

  const city = weather.weatherData.city;
  const current = weather.weatherData.current;

  const fetchCurrentWeather: any = () => {
    const fetchCurrent = fetch(
      //${lat}${lon}
      `${WEATHER_API_URL}/weather?lat=44.34&lon=10.99&units=metric&appid=${WEATHER_API_KEY}`
    );

    Promise.all([fetchCurrent]).then(async (response) => {
      const currentResponse = await response[0].json();
      setCurrentWeather(currentResponse);
    });
    console.log(currentWeather);
  };

  return (
    <div>
      <h2>Weather data</h2>
      {weather.loading && <div>Loading...</div>}
      <div className="weatherCard">
        <h3 style={{ marginBottom: '0' }}>
          ({city.id}) {city.name}, {city.country}
        </h3>
        <hr />
        <h4 style={{ marginTop: '0' }}>
          {city.coord.lat}, {city.coord.lon}
        </h4>
        <button onClick={fetchOptions}>(Console)</button>
        <div></div>
      </div>
    </div>
  );
};
