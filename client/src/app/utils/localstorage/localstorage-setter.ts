export const localStorageSetter = (key: string, data: unknown) => {
  localStorage.setItem(key, data as string);
};
