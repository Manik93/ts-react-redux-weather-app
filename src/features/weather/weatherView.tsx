import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { formattedDate, dayOfTheWeek } from '../../app/utils';
import './weatherStyle.css';
import geoIcon from '../../assets/geolocation_ico.png';

export const WeatherView = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 60000);
  }, []);
  const weatherReq = useAppSelector((state) => state.weather);
  const weatherData = weatherReq.weatherData;

  console.log('WeatherView Render: ', weatherData);

  return (
    <div className="weatherView">
      {weatherReq.loading ? (
        <div id="wrapper">
          <div className="weatherBackground">
            <div className="wb-1"></div>
            <div className="wb-2"></div>
            <div className="wb-3"></div>
            <div className="wb-4"></div>
          </div>
          <div className="loading">Loading...</div>
        </div>
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
                <div className="contentColumn">
                  <div className="dateTime">
                    <p className="dayOfTheWeek">{dayOfTheWeek()}</p>
                    <p className="currentTime">
                      {dateTime.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className="minMaxRow">
                    <p className="minMaxValue">
                      {`↓ ${Math.round(weatherData.main.temp_min)} °C`}
                    </p>
                    <p className="minMaxValue">
                      {`↑ ${Math.round(weatherData.main.temp_max)} °C`}
                    </p>
                  </div>
                  <p className="currentTemp">
                    {Math.round(weatherData.main.temp)} °C
                  </p>
                </div>
                <div className="contentColumn">
                  <img
                    alt="weather"
                    className="weatherIcon"
                    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  />
                  <p className="weatherDescription">
                    {weatherData.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      weatherData.weather[0].description.slice(1)}
                  </p>
                </div>
                <div className="contentColumnRight">
                  <div className="parameter-row">
                    <p className="parameter-label">Humidity: </p>
                    <p className="parameter-value">
                      {`${Math.round(weatherData.main.humidity)} %`}
                    </p>
                  </div>
                  <div className="parameter-row">
                    <p className="parameter-label">Feels like: </p>
                    <p className="parameter-value">
                      {`${Math.round(weatherData.main.feels_like)} °C`}
                    </p>
                  </div>
                  <div className="parameter-row">
                    <p className="parameter-label">Wind: </p>
                    <p className="parameter-value">
                      {`${Math.round(weatherData.wind.speed)} m/s`}
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
