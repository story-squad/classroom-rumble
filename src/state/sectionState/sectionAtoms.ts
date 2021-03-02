import { atom } from 'recoil';
import { Sections } from '../../api';

export const list = atom<Sections.ISectionWithRumbles[]>({
  key: 'sectionList',
  default: [],
});
