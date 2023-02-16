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
  options: [] as Array<OptionType>,
  error: '',
};

export const fetchOptions: any = createAsyncThunk(
  'search/fetchGeoData',
  async (InputValue: string) => {
    try {
      const response = await axios
        .get(
          `${GEO_API_URL}/cities?minPopulation=700000&namePrefix=${InputValue}`,
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
    } catch (error) {
      console.error(error);
      return [] as OptionType[];
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOptions.fulfilled,
      (state, action: PayloadAction<OptionType[]>) => {
        state.loading = false;
        state.options = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchOptions.rejected, (state, action) => {
      state.loading = false;
      state.options = [] as OptionType[];
      state.error =
        action.error.message || "Can't fetch async paginate options";
    });
  },
});

export default searchSlice.reducer;
