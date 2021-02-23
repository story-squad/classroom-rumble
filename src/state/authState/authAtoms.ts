import { atom } from 'recoil';
import { IUser } from '../../utils';

export const authToken = atom<string | undefined>({
  key: 'authToken',
  default: undefined,
});

export const user = atom<IUser | undefined>({
  key: 'currentUser',
  default: undefined,
});
