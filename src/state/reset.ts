import { selector } from 'recoil';
import { authToken, isLoggedIn, user } from './authState';
import { hasSubmitted } from './currentViewState';

export const reset = selector<undefined>({
  key: 'clearRecoilState',
  get: () => undefined,
  set: ({ reset }) => {
    reset(authToken);
    reset(user);
    reset(isLoggedIn);
    reset(hasSubmitted);
  },
});
