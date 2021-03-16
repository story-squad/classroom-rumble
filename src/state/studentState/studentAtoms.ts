import { atom } from 'recoil';
import { Students } from '../../api';

export const list = atom<Students.IStudentWithSubmissions[] | undefined>({
  key: 'studentList',
  default: undefined,
});
