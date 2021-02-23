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
