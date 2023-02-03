import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import weatherReducer from '../features/weather/weatherSlice';
import geoReducer from '../features/search/searchSlice';
import forecastReducer from '../features/forecast/forecastSlice';

const store = configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* reduxLogger */),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
