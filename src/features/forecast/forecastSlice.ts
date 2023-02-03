import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../app/api';
import axios from 'axios';

type OptionType = {
  value: string;
  label: string;
};

type InitialState = {
  loading: boolean;
  forecast: {};
  error: string;
};

const initialState: InitialState = {
  loading: false,
  forecast: {},
  error: '',
};

export const handleOnSearchChange = (searchData: any) => {
  /* const [lat, lon] = searchData.value.split(' ');

  const currentWeatherFetch = axios.get(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  const forecastFetch = axios.get(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );

  Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const currentWeatherResponse = await response[0];
      const forecastResponse = await response[1];

      setCurrentWeather({ city: searchData.label, ...currentWeatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(currentWeather, ' : ', forecast); */
};

//suspend exec
const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const fetchForecast: any = createAsyncThunk(
  'forecast/fetchForecast',
  async (Lat: any, Lon: any) => {
    const lat = Lat,
      lon = Lon;
    const response = await axios
      .get(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      )
      .then((response) => response.data)
      .catch((error) => console.error(error));
    console.log('forecast/fetchForecast ', response);
    return response;
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchForecast.fulfilled,
      (state, action: PayloadAction<OptionType[]>) => {
        state.loading = false;
        state.forecast = action.payload;
        state.error = '';
        console.log('Forecast payload: ', action.payload);
        console.log('Forecast prev state: ', state.forecast);
      }
    );
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.loading = false;
      state.forecast = [];
      state.error = action.error.message || `Can't fetch forecast data`;
    });
  },
});

export default forecastSlice.reducer;
