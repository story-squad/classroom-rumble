import { DefaultValue, selector } from 'recoil';
import { Rumbles } from '../../api';
import * as sections from '../sectionState';
import { list } from './rumbleAtoms';

export const addRumbles = selector<Rumbles.IRumbleWithSectionInfo[]>({
  key: 'addRumblesToState',
  get: ({ get }) => get(list),
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const rumbleList = get(list);
    const sectionList = get(sections.list);

    set(list, [...rumbleList, ...newValue]);
    set(
      sections.list,
      sectionList.map((sec) => ({
        ...sec,
        rumbles: [
          ...sec.rumbles,
          ...rumbleList.filter((rum) => rum.sectionId === sec.id),
        ],
      })),
    );
  },
});
