import { atom } from 'recoil';
import { Section } from '../../api';

export const list = atom<Section.ISection[] | undefined>({
  key: 'sectionList',
  default: undefined,
});
