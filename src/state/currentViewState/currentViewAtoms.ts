import { atom } from 'recoil';
import { Auth, Sections, Submissions } from '../../api';

export const student = atom<Auth.IUser | undefined>({
  key: 'currentStudentView',
  default: undefined,
});

export const section = atom<Sections.ISectionWithRumbles | undefined>({
  key: 'currentSectionView',
  default: undefined,
});

export const sub = atom<Submissions.ISubItem | undefined>({
  key: 'currentSubView',
  default: undefined,
});
