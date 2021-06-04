import { selector } from 'recoil';
import { hasSubmitted } from './appState';
import { authToken, user } from './authState';

export const reset = selector<undefined>({
  key: 'clearRecoilState',
  get: () => undefined,
  set: ({ reset }) => {
    reset(authToken);
    reset(user);
    reset(hasSubmitted);
  },
});
