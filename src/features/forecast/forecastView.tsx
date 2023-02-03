import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './forecastStyle.css';

export const ForecastView = () => {
  const dispatch = useAppDispatch();

  const forecast = useAppSelector((state) => state.forecast);
  console.log('ForecastView Render: ', forecast);

  return (
    <div style={{ backgroundColor: 'antiquewhite' }}>
      <h2 style={{ margin: '0' }}>Forecast</h2>
      <div className="forecastContainer">
        <div style={{ backgroundColor: '#7a5e74', width: '40%' }}>Text1</div>
        <div style={{ backgroundColor: '#d46f5d', width: '15%' }}>Text2</div>
        <div style={{ backgroundColor: '#fda935', width: '15%' }}>Text3</div>
        <div style={{ backgroundColor: '#ecc490', width: '30%' }}>Text3</div>
      </div>
    </div>
  );
};
