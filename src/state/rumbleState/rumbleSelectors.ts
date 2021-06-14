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
  onAfter: ({ newValues, set, updatedIds }) => {
    console.log('inner1', { newValues, updatedIds });
    newValues.forEach((rum) => {
      console.log('inner2', rum);
      set(getBySectionId(rum.sectionId), (prev) =>
        prev ? [...prev, rum.id] : [rum.id],
      );
    });
  },
  enableLogs: true,
});
