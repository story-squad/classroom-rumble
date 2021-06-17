import { atom, atomFamily } from 'recoil';
import { Students } from '../../api';
import { logger, persist } from '../effects';

export const ids = atom<number[] | undefined>({
  key: 'studentIds',
  default: undefined,
});

export const getById = atomFamily<
  Students.IStudentWithSubmissions | undefined,
  number
>({
  key: 'studentById',
  default: undefined,
});

export const getIdsBySectionId = atomFamily<
  number[] | undefined,
  number | undefined
>({
  key: 'studentIdsBySectionId',
  default: undefined,
  effects_UNSTABLE: [logger()],
});

export const selected = atom<number | undefined>({
  key: 'selectedStudent',
  default: undefined,
  effects_UNSTABLE: [persist('student:selected')],
});
