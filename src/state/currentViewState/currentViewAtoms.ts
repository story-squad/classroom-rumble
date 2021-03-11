import { atom } from 'recoil';
import { Auth, Rumbles, Sections, Submissions } from '../../api';

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

export const rumble = atom<Rumbles.IRumbleWithSectionInfo | undefined>({
  key: 'currentRumbleView',
  default: undefined,
});
