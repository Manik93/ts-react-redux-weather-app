import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLocalStorage = (initValue: any, key: any) => {
  const storage = localStorage.getItem(key); // string | null

  if (storage) {
    return JSON.parse(storage);
  }
  return initValue;
};
