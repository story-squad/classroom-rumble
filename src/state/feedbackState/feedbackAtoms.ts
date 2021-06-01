import { atom, atomFamily } from 'recoil';
import { Feedback } from '../../api';

export const ids = atom<number[] | undefined>({
  key: 'feedbackIds',
  default: undefined,
});

export const getById = atomFamily<Feedback.IFeedback | undefined, number>({
  key: 'feedbackById',
  default: undefined,
});
