import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOptions } from './searchSlice';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchWeatherData } from '../weather/weatherSlice';
import './searchStyle.css';

export const SearchView = ({ onSearchChange }: any) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');

  //
  const geo: any = useAppSelector((state) => state.geo);
  console.log('SearchView Render: ', geo);
  //

  const loadOptions = (search: string) => {
    const options = dispatch(fetchOptions(search)).unwrap();
    console.log('loadOptions');
    return options;
  };

  const handleOnChange = (searchData: any) => {
    dispatch(fetchWeatherData(searchData.value));
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="searchContainer">
      <AsyncPaginate
        className="searchInput"
        placeholder="City search..."
        debounceTimeout={500}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};
