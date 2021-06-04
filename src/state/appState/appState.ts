import { atom } from 'recoil';

export const hasSubmitted = atom<boolean>({
  key: 'currentUserHasSubmitted',
  default: false,
});
