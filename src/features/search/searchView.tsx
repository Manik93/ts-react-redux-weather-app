import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { AsyncPaginate } from 'react-select-async-paginate';
import { OptionType } from '../../app/types';
import { fetchOptions } from './searchSlice';
import { fetchWeatherData } from '../weather/weatherSlice';
import { fetchForecast } from '../forecast/forecastSlice';
import './searchStyle.css';
import gitIcon from '../../assets/github_ico.png';

export const SearchView = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');

  //search field options check
  const geoOptions: OptionType[] = useAppSelector((state) => state.geo.options);
  console.log('SearchView Render: ', geoOptions);
  //

  const loadOptions = (search: string) => {
    const options = dispatch(fetchOptions(search)).unwrap();
    return options;
  };

  const handleOnChange = (searchData: any) => {
    dispatch(fetchWeatherData(searchData.value));
    dispatch(fetchForecast(searchData.value));
    setSearch(searchData);
  };

  return (
    <div className="searchView">
      <div className="searchInput">
        <AsyncPaginate
          placeholder="City search..."
          debounceTimeout={500}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
      <div className="menuPanel">
        <div className="menuElements">
          <p>Eng</p>
          <p>Rus</p>
        </div>
        <a href="https://github.com/Manik93/ts-react-redux-weather-app">
          <img className="gitIcon" src={gitIcon} alt="gitIcon"></img>
        </a>
      </div>
    </div>
  );
};
