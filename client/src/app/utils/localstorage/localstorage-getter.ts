import { LSKeys } from './localstorage-keys';

export const localStorageGetter = (key: LSKeys) => {
  return localStorage.getItem(key);
};
