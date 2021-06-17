import { atom } from 'recoil';
import { Auth } from '../../api';
import { token } from '../../utils';
import { persist } from '../effects';

export const authToken = atom<string | undefined>({
  key: 'authToken',
  default: undefined,
  effects_UNSTABLE: [persist(token.label, { asString: true })],
});

export const user = atom<Auth.IUser | undefined>({
  key: 'currentUser',
  default: undefined,
  effects_UNSTABLE: [persist('auth:user')],
});

export const logoutModalOpen = atom<boolean>({
  key: 'isLogoutModalOpen',
  default: false,
});

export const cleverLoginButtonURL = atom<string | undefined>({
  key: 'cleverLoginButtonURL',
  default: undefined,
});

export const loadingCleverLoginButtonURL = atom<boolean>({
  key: 'loadingCleverLoginButtonURL',
  default: false,
});
