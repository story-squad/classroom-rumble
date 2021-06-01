import { AtomEffect, DefaultValue } from 'recoil';

export const persist: <DataType>(key: string) => AtomEffect<DataType> = (
  key,
) => ({ onSet, setSelf }) => {
  // Initialize on app load
  const initVal = localStorage.getItem(key);
  if (initVal !== null) setSelf(JSON.parse(initVal));

  // And add the onSet atom event handler
  onSet((newVal) => {
    if (newVal instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newVal));
    }
  });
};
