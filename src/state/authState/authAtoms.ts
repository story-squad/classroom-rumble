import { atom } from 'recoil';
import { Auth } from '../../api';

export const authToken = atom<string | undefined>({
  key: 'authToken',
  default: undefined,
});

export const user = atom<Auth.IUser | undefined>({
  key: 'currentUser',
  default: undefined,
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
