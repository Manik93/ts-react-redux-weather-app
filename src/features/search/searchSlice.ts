import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GEO_API_URL, geoApiOptions } from '../../app/api';
import { OptionType } from '../../app/types';
import axios from 'axios';

type InitialState = {
  loading: boolean;
  options: OptionType[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  options: [],
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

export const fetchOptions: any = createAsyncThunk(
  'search/fetchGeoData',
  async (InputValue: string) => {
    const response = await axios
      .get(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${InputValue}`,
        geoApiOptions
      )
      .then((response) => response.data.data as OptionType[])
      .then((response) => {
        return {
          options: response?.map((city: any) => {
            return <OptionType>{
              value: `${city?.latitude} ${city?.longitude}`,
              label: `${city?.name}, ${city?.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.error(error));

    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.pending, (state) => {
      state.loading = true;
      state.options = [];
    });
    builder.addCase(
      fetchOptions.fulfilled,
      (state, action: PayloadAction<OptionType[]>) => {
        state.loading = false;
        state.options = action.payload;
        state.error = '';
        console.log('fetchOptions fulfilled: ', action.payload);
      }
    );
    builder.addCase(fetchOptions.rejected, (state, action) => {
      state.loading = false;
      state.options = [];
      state.error = action.error.message || "Can't fetch select options";
    });
  },
});

export default searchSlice.reducer;
