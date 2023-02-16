import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../app/api';
import { ForecastData } from '../../app/types';
import axios from 'axios';

type InitialState = {
  loading: boolean;
  forecastData: ForecastData;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  forecastData: {} as ForecastData,
  error: '',
};

export const fetchForecast: any = createAsyncThunk(
  'forecast/fetchForecast',
  async (coords: string) => {
    const [lat, lon] = coords.split(' ');

    const response = await axios
      .get(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      )
      .then((response) => response.data)
      .then((response) => {
        return { city: response.city, list: response.list };
      })
      .catch((error) => console.error(error));

    return response as ForecastData;
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.loading = true;
      state.forecastData = {} as ForecastData;
    });
    builder.addCase(
      fetchForecast.fulfilled,
      (state, action: PayloadAction<ForecastData>) => {
        state.loading = false;
        state.forecastData = action.payload;
        localStorage.setItem('forecastData', JSON.stringify(action.payload));
        state.error = '';
      }
    );
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.loading = false;
      state.forecastData = {} as ForecastData;
      state.error = action.error.message || `Can't fetch forecast data`;
    });
  },
});

export default forecastSlice.reducer;
