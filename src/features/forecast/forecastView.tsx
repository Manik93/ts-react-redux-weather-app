import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { weekDaysFromCurrent } from '../../app/utils';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './forecastStyle.css';
import { ForecastData } from '../../app/types';

interface forecastProps {
  location: string;
  forecastData?: ForecastData;
}

export const ForecastView = ({ location }: forecastProps) => {
  const forecastData = useAppSelector((state) => state.forecast.forecastData);

  try {
    const filteredForecast = forecastData.list.filter(
      (item, index) => !((index + 1) % 9)
    );
    console.log(
      'ForecastView Render: ',
      forecastData,
      '\nfiltered: ',
      filteredForecast
    );

    return (
      <div className="forecastView">
        <Accordion allowZeroExpanded>
          {filteredForecast.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      className="icon-small"
                      alt="weather"
                    />
                    <label className="day">
                      {weekDaysFromCurrent()[index]}
                    </label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {item.main.temp_min}°C / {item.main.temp_max} °C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all} %</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like} °C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  } catch (error) {
    console.log('Error');
    return <></>;
  }
};
