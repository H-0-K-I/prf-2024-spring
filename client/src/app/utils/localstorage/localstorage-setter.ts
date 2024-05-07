import { LSKeys } from './localstorage-keys';

export const localStorageSetter = (key: LSKeys, data: unknown) => {
  localStorage.setItem(key, data as string);
};
