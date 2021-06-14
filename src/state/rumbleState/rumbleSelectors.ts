import { RecoilValue, selector, selectorFamily } from 'recoil';
import { Rumbles } from '../../api';
import { factories } from '../helpers';
import { getById, getBySectionId, ids, selected } from './rumbleAtoms';

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
    let rumbleAtom: RecoilValue<number[] | undefined>;
    if (sectionId) rumbleAtom = getBySectionId(sectionId);
    else rumbleAtom = ids;

    const rumbleIdList = get(rumbleAtom) || [];

    if (!phases || !rumbleIdList) {
      return rumbleIdList;
    } else {
      const filteredRumbles = rumbleIdList.filter((id) => {
        const rumble = get(getById(id));
        // Rumble will be included if not set? We can load it later?
        if (!rumble) return true;
        else return phases.includes(rumble.phase);
      });
      return filteredRumbles;
    }
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addRumbles',
  getById,
  ids,
  onAfter: ({ set, get, newValues }) => {
    console.log('add rumble onAfter effect', { newValues });

    // Initialize values for storage
    const sectionIds: number[] = [];
    const rumbleIdsBySectionId: Record<number, number[]> = {};

    newValues.forEach((rum) => {
      if (!sectionIds.includes(rum.sectionId)) sectionIds.push(rum.sectionId);
      // If the array has not been initialized, do it now (once)
      if (!rumbleIdsBySectionId[rum.sectionId])
        rumbleIdsBySectionId[rum.sectionId] = [];

      // Add the rumble to our array by section
      if (!rumbleIdsBySectionId[rum.sectionId].includes(rum.id)) {
        rumbleIdsBySectionId[rum.sectionId].push(rum.id);
      }
    });

    sectionIds.forEach((secId) => {
      const newIds = rumbleIdsBySectionId[secId];
      console.log('onAfter adding', newIds, 'to section', secId);

      const prevIds = get(getBySectionId(secId)) || [];
      console.log('previous ids', prevIds);

      const filteredIds = newIds.filter((nId) => !prevIds.includes(nId));
      console.log('merging the following', prevIds, filteredIds);

      set(getBySectionId(secId), [...prevIds, ...filteredIds]);
    });
  },
  enableLogs: true,
});
