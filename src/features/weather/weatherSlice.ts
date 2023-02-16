import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../../app/types';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../app/api';
import axios from 'axios';

type InitialState = {
  loading: boolean;
  weatherData: WeatherData;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  weatherData: {} as WeatherData,
  error: '',
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (coords: string) => {
    const [lat, lon] = coords.split(' ');

    const response = await axios
      .get(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      )
      .then((response) => response.data)
      .catch((error) => console.error(error));

    return response as WeatherData;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWeatherData.fulfilled,
      (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.weatherData = action.payload;
        state.error = '';
        localStorage.setItem('currentWeather', JSON.stringify(action.payload));
      }
    );
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.weatherData = {} as WeatherData;
      state.error = action.error.message || "Can't fetch current weather data";
    });
  },
});

export default weatherSlice.reducer;
