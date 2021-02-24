# Recoil - Global State Management

## Introduction

Recoil is a global state management library for `React` still in development by the team at Facebook. It has been opened up to the public and is available for use in other projects. It is only compatible with `Functional Components`. It cannot be used by `Class Components` currently. Some features that are in development are unstable and are not recommended for use. Recoil provides a simple yet powerful solution to implementing a global state management setup in your applications.

- Find out more about Recoil [here](https://recoiljs.org/)

- An official Recoil tutorial project can be found [here](https://recoiljs.org/docs/basic-tutorial/intro)

## Using Recoil

Recoil state is divided into 2 main categories:

### `Atoms`

A piece of global state that can be accessed by any component in the app through the use of hooks.

#### Atom Example

```ts
import { atom } from 'recoil';

const initialAtomValue<AtomType> = someValue;
export const myAtom = atom<null | AtomType>({
  key: 'myAtom', // key must be unique
  default: initialAtomValue, // initial state
});
```

### `Selectors`

Derived global state. Think of this as an atom that has been passed into a pure function to return a new value.

#### Selector Example

```ts
import { selector } from 'recoil';
import { myAtom } from 'path/to/atom-file';

export const mySelector = selector({
  // key must be unique
  key: 'mySelector',
  // function that returns a derived value from the atom
  get: ({ get }) => {
    const value = get(myAtom);

    return value + 10;
  },
});
```

`Atoms` can be "subscribed" to by components using one of several Recoil Hooks in a manner similar to the `useState` Hook in `React`.

#### Hook Example

```tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { myAtom } from 'path/to/atom';

const MyComponent = () => {
  // useRecoilState provides Get and Set methods like useState
  const [appTitle, setAppTitle] = useRecoilState(myAtom);

  return (
    <div id="app">
      <h1>{appTitle}</h1>
    </div>
  );
};

export default MyComponent;
```

```ts
// Only need the value? There's a hook for that, too!
const myAtomValue = useRecoilValue(myAtom);

// Only need the setter function? We got you covered!
const setMyAtom = useSetRecoilState(myAtom);
```

If a component needs to set the state but doesn't need to read the value, just use the `useSetRecoilState` hook~ The advantage with this setup is the component setting the state will not be subscribed to state changes and will not be re-rendered when this state changes. In a large component tree structure this means the app will be more performant as it can reduce unnecessary re-renders.

## File Structure

For this project please follow the outlined structure for file orginization. For each global state item, create a named folder within `state/`. Inside of this folder add an `index.js`, `atoms.js` and `selectors.js` as needed. The index file will simply contain exports for all of this state's atoms and selectors.

### Example Folder Structure

```text
state/
|-- index.ts <- This file exposes all atoms/selectors as named modules
|
|-- dataState/
|   |
|   |-- index.ts          <- Modules must have an index
|   |-- dataAtoms.ts      <- All related atoms should be grouped
|   |-- dataSelectors.ts  <- As should all related selectors
|
|-- userState/            <- Named: dataNameState where dataName = 'user'
    |
    |-- index.ts
    |-- userAtoms.ts      <- Named: dataNameAtoms where dataName = 'user
    |-- userSelectors.ts  <- Named: dataNameSelectors
```

### Example Module Exports

```ts
/* /state/userState/userAtoms.ts */
export const userId = atom<number | null>({ ... });

/* /state/userState/userSelectors.ts */
export const userIdSelector = selector<number>({ ... });

/* /state/userState/index.ts */
export * from './userAtoms';
export * from './userSelectors';

/* /state/index.ts */
export * as user from './userState';
```

### Example Module Imports

```tsx
import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from '../state';

const Component = (): React.ReactElement => {
  // To call the Atom
  const [userId, setUserId] = useRecoilState(user.userId);
  // To read the Selector value
  const userIdSelector = useRecoilValue(user.userIdSelector);

  return (
    ...
  )
}

export default Component
```

> Notice how the module is exported as a named group of atoms/selectors: all information related to the state of the user should be in the `user` module:
>
> - `user.userId`
> - `user.userIdSelector`
