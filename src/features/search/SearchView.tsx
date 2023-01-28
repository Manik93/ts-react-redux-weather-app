import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOptions, loadOptions, OptionType } from './searchSlice';
import './searchStyle.css';
import { AsyncPaginate } from 'react-select-async-paginate';

export const SearchView = ({ onSearchChange }: any) => {
  //const geoOptions: OptionType[] = useAppSelector((state) => state.geo.options);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOptions(search));
  }, []);

  const [search, setSearch] = useState<string>('');

  const handleOnChange = (searchData: any) => {
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
