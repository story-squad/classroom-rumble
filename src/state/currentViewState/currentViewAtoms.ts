import { atom } from 'recoil';

// This is USER state, not submission state
export const hasSubmitted = atom<boolean>({
  key: 'currentUserHasSubmitted',
  default: false,
});
