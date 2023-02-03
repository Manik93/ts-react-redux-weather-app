import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../../app/types';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../app/api';
import axios from 'axios';

type InitialState = {
  loading: boolean;
  weatherData: WeatherData;
  error: string;
};

/* coord: { lon: '', lat: '' },
weather: [{ id: 0, main: '', description: '', icon: '' }],
main: {
  temp: 0,
  feels_like: 0,
  temp_min: 0,
  temp_max: 0,
  pressure: 0,
  humidity: 0,
  sea_level: 0,
  grnd_level: 0,
},
visibility: 0,
wind: { speed: 0, deg: 0, gust: 0 },
clouds: { all: 0 },
id: 0,
name: '', */

const initialState: InitialState = {
  loading: false,
  weatherData: {},
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
      .then((response) => {
        return {
          coord: response.coord,
          weather: response.weather,
          main: response.main,
          visibility: response.visibility,
          wind: response.wind,
          clouds: response.clouds,
          rain: response.rain,
          snow: response.snow,
          id: response.id,
          name: response.name,
        };
      })
      .catch((error) => console.error(error));

    return response;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.loading = true;
      state.weatherData = {};
    });
    builder.addCase(
      fetchWeatherData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.weatherData = action.payload;
        state.error = '';
        console.log('fetchWeatherData fulfilled : ', action.payload);
      }
    );
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.weatherData = {};
      state.error = action.error.message || "Can't fetch weather data";
    });
  },
});

export default weatherSlice.reducer;
