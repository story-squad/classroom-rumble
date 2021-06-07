import { selector } from 'recoil';
import { Sections } from '../../api';
import { factories } from '../helpers';
import { getById, ids, selected } from './sectionAtoms';

export const current = selector<Sections.ISectionWithRumbles | undefined>({
  key: 'currentlySelectedSection',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const section = get(getById(currentId));
    return section;
  },
});

export const getAll = selector<Sections.ISectionWithRumbles[] | undefined>({
  key: 'getAllSectionObjects',
  get: ({ get }) => {
    const idList = get(ids);
    const sections: Sections.ISectionWithRumbles[] = [];
    idList?.forEach((id) => {
      const section = get(getById(id));
      if (section) sections.push(section);
    });
    return sections;
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addSection',
  getById,
  ids,
});
