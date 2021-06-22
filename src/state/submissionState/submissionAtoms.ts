import { atom, atomFamily } from 'recoil';
import { Submissions } from '../../api';
import { logger, persist } from '../effects';

export const ids = atom<number[] | undefined>({
  key: 'submissionIds',
  default: undefined,
});

export const getById = atomFamily<
  Submissions.ISubItem | undefined,
  number | undefined
>({
  key: 'submissionById',
  default: undefined,
});

export const selected = atom<number | undefined>({
  key: 'selectedSubmission',
  default: undefined,
  effects_UNSTABLE: [persist('submission:selected'), logger()],
});

export const getIdByRumbleAndUser = atomFamily<
  number | undefined,
  { rumbleId?: number; userId?: number }
>({
  key: 'getSubmissionByRumbleAndUserIds',
  default: undefined,
});
