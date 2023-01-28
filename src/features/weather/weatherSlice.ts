import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../app/api';
import axios from 'axios';
import { useState } from 'react';

type WeatherData = {
  current: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    weather: {
      main: string;
      description: string;
    };
  };
  city: {
    id: number;
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
};

type InitialState = {
  loading: boolean;
  weatherData: WeatherData;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  weatherData: {
    current: {
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      weather: {
        main: '',
        description: '',
      },
    },
    city: {
      id: 0,
      name: '',
      country: '',
      coord: {
        lat: 0,
        lon: 0,
      },
    },
  },
  error: '',
};
//'/weather?lat={lat}&lon={lon}&appid={API key}';
interface CurrentWeather {
  lat: number;
  lon: number;
  apiKey: string;
}

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  () => {
    return axios
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?id=4350049&appid=b3e06100de79a013d6da6f01e23f04b5'
      )
      .then((response) => response.data);
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
      }
    );
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default weatherSlice.reducer;
