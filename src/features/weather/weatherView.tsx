import { useEffect, useState } from 'react';
import { WeatherData } from '../../app/types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { formattedDate, dayOfTheWeek } from '../../app/utils';
import './weatherStyle.css';
import geoIcon from '../../assets/geolocation_ico.png';

/*  local storage
  const lsObject: WeatherData = localStorage.getItem('currentWeather') as WeatherData;
  console.log('Object from ls: ', JSON.parse(lsObject as string)); 
  */

export const WeatherView = () => {
  const weatherReq = useAppSelector((state) => state.weather);
  const weatherData = weatherReq.weatherData;

  console.log('WeatherView Render: ', weatherData);

  return (
    <div className="weatherView">
      {weatherReq.loading ? (
        <div>Loading...</div>
      ) : (
        weatherData && (
          <div id="wrapper">
            <div className="weatherBackground">
              <div className="wb-1"></div>
              <div className="wb-2"></div>
              <div className="wb-3"></div>
              <div className="wb-4"></div>
            </div>
            <div className="weatherCard">
              <div className="cardHeader">
                <div className="cityPanel">
                  <img className="geoIcon" src={geoIcon} alt="geoIcon" />
                  <p className="cityName">
                    {`${weatherData.name}, ${weatherData.sys.country}`}
                  </p>
                </div>
                <div className="datePanel">
                  <p className="currentDate">{formattedDate('ru')}</p>
                </div>
              </div>
              <div className="cardContent">
                <div className="left">
                  <div className="parameter-row">
                    <p className="dayOfTheWeek">{dayOfTheWeek()}</p>
                    <p className="currentTime">currentTime</p>
                  </div>
                  <div className="minMaxTemp">
                    <p className="parameter-value">
                      {`↓ ${Math.round(weatherData.main.temp_min)} °C`}
                    </p>
                    <p className="parameter-value">
                      {`↑ ${Math.round(weatherData.main.temp_max)} °C`}
                    </p>
                  </div>
                  <p className="currentTemp">
                    {Math.round(weatherData.main.temp)} °C
                  </p>
                </div>
                <div className="center">
                  {weatherData.weather && (
                    <>
                      <div className="parameter-row">
                        <img
                          alt="weather"
                          className="weatherIcon"
                          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        />
                      </div>
                      <div className="parameter-row">
                        <p className="weather-description">
                          {weatherData.weather &&
                            weatherData.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              weatherData.weather[0].description.slice(1)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="right">
                  <div className="parameter-row">
                    <p className="parameter-label">Humidity: </p>
                    <p className="parameter-value">
                      {`${Math.round(weatherData.main.humidity)} %`}
                    </p>
                  </div>
                  <div className="parameter-row">
                    <p className="parameter-label">Feels like: </p>
                    <p className="parameter-value">
                      {`${Math.round(weatherData.main.feels_like)} m/s`}
                    </p>
                  </div>
                  <div className="parameter-row">
                    <p className="parameter-label">Wind: </p>
                    <p className="parameter-value">
                      {`${weatherData.wind.speed} m/s`}
                    </p>
                  </div>
                  <div className="parameter-row">
                    <p className="parameter-label">Pressure: </p>
                    <p className="parameter-value">
                      {`${weatherData.main.pressure} hPa`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
