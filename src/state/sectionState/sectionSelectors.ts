import { selector } from 'recoil';
import { Sections } from '../../api';
import { factories } from '../helpers';
import { add as addRumble, ids as rumbleIds } from '../rumbleState';
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
  onAfter: ({ newValues, set, get }) => {
    console.log('set rumbles after sections', newValues);
    // After the sections are added to state, add their rumbles too!
    newValues.forEach((sec) => {
      const rIds = sec.rumbles.map((r) => r.id);

      console.log('add rumbles', rumbleIds, sec.rumbles, sec);
      // Update the specific atom family state that returns an array of rumble ids for a given section
      set(addRumble, sec.rumbles);
      console.log(get(rumbleIds), rIds);
    });
  },
});
