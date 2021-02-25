import { atom } from 'recoil';

export const isLogin = atom<boolean>({
  key: 'authFormIsLogin',
  default: true,
});
