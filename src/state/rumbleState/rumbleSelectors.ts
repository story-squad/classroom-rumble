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

    const newList = [...rumbleList, ...newValue];
    set(list, newList);

    const newSectionList = sectionList.map((sec) => ({
      ...sec,
      rumbles: [
        ...sec.rumbles,
        ...newValue
          .filter((rum) => rum.sectionId === sec.id)
          .map((rum) => ({ ...rum, phase: rum.phase ?? 'INACTIVE' })),
      ],
    }));
    set(sections.list, newSectionList);
  },
});
