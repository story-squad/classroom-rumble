import { atom } from 'recoil';
import { Select } from '../../components/common';

export const grades = atom<Select.IOption[] | undefined>({
  key: 'gradeDropdownOptions',
  default: undefined,
});

export const subjects = atom<Select.IOption[] | undefined>({
  key: 'subjectDropdownOptions',
  default: undefined,
});
