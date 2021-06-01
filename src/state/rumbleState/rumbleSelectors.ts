import { RecoilValue, selector, selectorFamily } from 'recoil';
import { Rumbles } from '../../api';
import { factories } from '../helpers';
import { getById, ids, selected } from './rumbleAtoms';

export const getIdsBySectionId = selectorFamily<number[] | undefined, number>({
  key: 'rumbleIdsBySectionId',
  get: (sectionId) => ({ get }) => {
    return get(ids)?.filter((id) => get(getById(id))?.sectionId === sectionId);
  },
});

export const current = selector<Rumbles.IRumbleWithSectionInfo | undefined>({
  key: 'currentlySelectedRumble',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const rumble = get(getById(currentId));
    return rumble;
  },
});

/**
 * Defaults to all active rumbles
 */
export const get = selectorFamily<
  number[] | undefined,
  { sectionId?: number; phases: Rumbles.RumblePhases[] }
>({
  key: 'getFilteredRumbles',
  get: ({ sectionId, phases }) => ({ get }) => {
    console.group('getting rumbles');
    console.log('get start', sectionId, phases);
    let rumbleAtom: RecoilValue<number[] | undefined>;
    if (sectionId) rumbleAtom = getIdsBySectionId(sectionId);
    else rumbleAtom = ids;
    console.log(
      { rumbleAtom },
      get(ids),
      get(getIdsBySectionId(sectionId || 1)),
    );

    const rumbleIdList = get(rumbleAtom) || [];

    console.log('just got', rumbleIdList);

    if (!phases || !rumbleIdList) {
      console.log('no phases');
      console.groupEnd();
      return rumbleIdList;
    } else {
      console.log('phases', phases);
      const filteredRumbles = rumbleIdList.filter((id) => {
        const rumble = get(getById(id));
        console.log('rumble for', id, rumble);
        // Rumble will be included if not set? We can load it later?
        if (!rumble) return true;
        else return phases.includes(rumble.phase);
      });
      console.groupEnd();
      return filteredRumbles;
    }
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addRumble',
  getById,
  ids,
});
