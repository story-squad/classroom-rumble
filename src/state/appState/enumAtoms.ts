import { atom } from 'recoil';
import { FormTypes } from '../../types';

export const grades = atom<FormTypes.IOption[] | undefined>({
  key: 'gradeDropdownOptions',
  default: undefined,
});

export const subjects = atom<FormTypes.IOption[] | undefined>({
  key: 'subjectDropdownOptions',
  default: undefined,
});
