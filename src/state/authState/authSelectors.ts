import { selector } from 'recoil';
import { authToken, user } from './authAtoms';

export const isLoggedIn = selector<boolean>({
  key: 'loginSelector',
  get: ({ get }) => {
    return get(user) !== undefined && get(authToken) !== undefined;
  },
});
