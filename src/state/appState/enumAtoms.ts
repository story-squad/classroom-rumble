import { atom } from 'recoil';
import { FormTypes } from '../../types';
import { logger } from '../effects';

export const grades = atom<FormTypes.IOption[] | undefined>({
  key: 'gradeDropdownOptions',
  default: undefined,
  effects_UNSTABLE: [logger()],
});

export const subjects = atom<FormTypes.IOption[] | undefined>({
  key: 'subjectDropdownOptions',
  default: undefined,
  effects_UNSTABLE: [logger()],
});
