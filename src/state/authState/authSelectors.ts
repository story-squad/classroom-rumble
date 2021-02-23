import { DefaultValue, selector } from 'recoil';
import { Auth } from '../../api';
import { token } from '../../utils';
import { authToken, user } from './authAtoms';

export const isLoggedIn = selector<Auth.IAuthResponse | undefined>({
  key: 'loginSelector',
  get: ({ get }) => {
    const curUser = get(user);
    const curToken = get(authToken);
    if (curToken && curUser) return { token: curToken, user: curUser };
  },
  set: ({ set }, newValue) => {
    // Typechecking
    if (
      !(newValue instanceof DefaultValue) &&
      typeof newValue === 'object' &&
      Reflect.has(newValue, 'token') &&
      Reflect.has(newValue, 'user') &&
      typeof newValue.user === 'object'
    ) {
      // Persist the user's info in localStorage
      token.set(newValue.token);
      token.setUser(newValue.user);
    }

    const t = token.get();
    const u = token.getUser();
    if (u && t) {
      // Persist that user's info in recoil state
      set(authToken, t);
      set(user, u);
    }
  },
});
