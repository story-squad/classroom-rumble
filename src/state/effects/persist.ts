import { AtomEffect, DefaultValue } from 'recoil';

export const persist: <DataType>(
  key: string,
  config?: {
    asString?: boolean;
  },
) => AtomEffect<DataType> = (key, config) => ({ onSet, setSelf, node }) => {
  const asString = config?.asString ?? false;
  console.log('persist hit', node.key, { asString, config });

  // Initialize on app load
  const initVal = localStorage.getItem(key);
  if (initVal !== null) {
    if (asString) {
      console.log('initializing w/o json', node.key, { initVal });
      // HACK - added type interface hack here so that we can store this as JUST a string and keep linter happy :)
      setSelf((initVal as unknown) as DefaultValue);
    } else {
      const parsedInitVal = JSON.parse(initVal);
      setSelf(parsedInitVal);
      console.log('initializing', node.key, { initVal, parsedInitVal });
    }
  }

  // And add the onSet atom event handler
  onSet((newVal) => {
    if (newVal instanceof DefaultValue) {
      console.log('clearing', node.key, { newVal, initVal });
      localStorage.removeItem(key);
    } else {
      if (asString) {
        console.log('setting w/o json', node.key, { newVal, initVal });
        // HACK - added type interface hack here so that we can store this as JUST a string and keep linter happy :)
        localStorage.setItem(key, (newVal as unknown) as string);
      } else {
        console.log('setting', node.key, { newVal, initVal });
        localStorage.setItem(key, JSON.stringify(newVal));
      }
    }
  });
};
