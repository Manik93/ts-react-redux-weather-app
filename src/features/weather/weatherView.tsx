import { useEffect, useState } from 'react';
import { fetchWeatherData } from './weatherSlice';
import { WeatherData } from '../../app/types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { WEATHER_API_KEY, WEATHER_API_URL } from '../../app/api';
import { fetchOptions } from '../search/searchSlice';
import './weatherStyle.css';

export const WeatherView = () => {
  const dispatch = useAppDispatch();

  const [currentWeather, setCurrentWeather] = useState<any>({});
  const geo = useAppSelector((state) => state.geo);
  const weather = useAppSelector((state) => state.weather);
  const weatherData = weather.weatherData;

  //setCurrentWeather(useAppSelector((state) => state.weather));
  console.log('WeatherView Render: ', weatherData);

  const handleOnClick = () => {
    dispatch(fetchWeatherData('54.9666 73.3833'));
    //dispatch(fetchWeatherData(geo.options[0].value));
    //console.log('OnClick Options: ', weatherData);
  };
  //console.log(currentWeather, ' : ', weather);
  /* useEffect(() => {
    //dispatch(fetchWeatherData());
    console.log(weather);
  }, []); */

  //const city = weather.weatherData.city;
  //const current = weather.weatherData.current;

  /*   const fetchCurrentWeather: any = () => {
    const fetchCurrent = fetch(
      //${lat}${lon}
      `${WEATHER_API_URL}/weather?lat=44.34&lon=10.99&units=metric&appid=${WEATHER_API_KEY}`
    );

    Promise.all([fetchCurrent]).then(async (response) => {
      const currentResponse = await response[0].json();
      setCurrentWeather(currentResponse);
    });
    console.log(currentWeather);
  }; */

  return (
    <div>
      {weather.loading ? (
        <div>Loading...</div>
      ) : (
        <div className="weatherCard">
          <h2 style={{ margin: '0' }}>Weather</h2>
          <button onClick={handleOnClick}>Check</button>
          <div className="top">
            <div>
              <p className="city">{weatherData && weatherData?.name}</p>
              <p className="weather-description">
                {weatherData.weather && weatherData.weather[0].description}
              </p>
            </div>
            {weatherData.weather && (
              <img
                alt="weather"
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              />
            )}
          </div>
          <div className="bottom">
            <p className="temperature">
              {weatherData.main && weatherData.main.temp} °C
            </p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label">Details</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Feels like: </span>
                <span className="parameter-value">
                  {weatherData.main && weatherData.main.feels_like} °C
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Wind: </span>
                <span className="parameter-value">
                  {weatherData.wind && weatherData.wind.speed}m/s
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Humidity: </span>
                <span className="parameter-value">
                  {weatherData.main && weatherData.main.humidity} %
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Pressure: </span>
                <span className="parameter-value">
                  {weatherData.main && weatherData.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
