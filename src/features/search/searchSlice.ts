import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GEO_API_URL, WEATHER_API_KEY, geoApiOptions } from '../../app/api';
import axios from 'axios';

export type OptionType = {
  value: string;
  label: string;
};

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

//suspend exec
const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const fetchOptions: any = createAsyncThunk<OptionType[]>(
  'search/fetchGeoData',
  async (InputValue: any) => {
    let options: OptionType[] = [];

    const response = await axios
      .get(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${InputValue}`,
        geoApiOptions
      )
      .then((response) => response.data)
      .catch((err) => console.error(err));

    try {
      if (response.data) {
        options = response?.data?.map((city: any) => {
          return {
            value: `${city?.latitude} ${city?.longitude}`,
            label: `${city?.name}, ${city?.countryCode}`,
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
    return options;
  }
);

export const loadOptions: any = (InputValue: any) => {
  return fetch(
    `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${InputValue}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response?.data?.map((city: any) => {
          return {
            value: `${city?.latitude} ${city?.longitude}`,
            label: `${city?.name}, ${city?.countryCode}`,
          };
        }),
      };
    })
    .catch((err) => console.error(err));
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.pending, (state) => {
      state.loading = true;
      console.log('fetchOptions pending');
    });
    builder.addCase(
      fetchOptions.fulfilled,
      (state, action: PayloadAction<OptionType[]>) => {
        state.loading = false;
        state.options = action.payload;
        state.error = '';
        console.log('fetchOptions fulfilled');
      }
    );
    builder.addCase(fetchOptions.rejected, (state, action) => {
      state.loading = false;
      state.options = [];
      state.error = action.error.message || `Can't fetch select options`;
      console.log('fetchOptions rejected');
    });
  },
});

export default searchSlice.reducer;
