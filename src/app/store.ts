import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import geoReducer from '../features/search/searchSlice';

const store = configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
