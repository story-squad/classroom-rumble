import { selector } from 'recoil';
import { authToken, user } from './authState';

export const reset = selector<undefined>({
  key: 'clearRecoilState',
  get: () => undefined,
  set: ({ reset }) => {
    reset(authToken);
    reset(user);
  },
});
