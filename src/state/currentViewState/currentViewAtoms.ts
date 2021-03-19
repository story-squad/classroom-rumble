import { atom } from 'recoil';
import { Rumbles, Sections, Students, Submissions } from '../../api';

export const student = atom<Students.IStudentWithSubmissions | undefined>({
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

export const hasSubmitted = atom<boolean>({
  key: 'currentUserHasSubmitted',
  default: false,
});
