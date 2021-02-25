import { atom } from 'recoil';
import { Sections } from '../../api';

export const list = atom<Sections.ISection[] | undefined>({
  key: 'sectionList',
  default: undefined,
});
