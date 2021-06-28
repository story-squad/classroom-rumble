import { DefaultValue, RecoilValue, selector, selectorFamily } from 'recoil';
import { Rumbles } from '../../api';
import { factories } from '../helpers';
import { getIdByRumbleAndUser } from '../submissionState';
import { getById, getBySectionId, ids, selected } from './rumbleAtoms';

export const current = selector<Rumbles.IRumbleWithSectionInfo | undefined>({
  key: 'currentlySelectedRumble',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const rumble = get(getById(currentId));
    return rumble;
  },
  set: ({ set }, newRumble) => {
    // Initialize/Clear
    if (!newRumble || newRumble instanceof DefaultValue)
      set(selected, undefined);
    else {
      set(getById(newRumble.id), newRumble);
      set(selected, newRumble.id);
    }
  },
});

/**
 * Defaults to all active rumbles
 */
export const get = selectorFamily<
  number[] | undefined,
  { sectionId?: number; phases: Rumbles.RumblePhases[]; enableLogs?: boolean }
>({
  key: 'getFilteredRumbles',
  get:
    ({ sectionId, phases, enableLogs = false }) =>
    ({ get }) => {
      enableLogs && console.log('getting rumbles', { sectionId, phases });
      let rumbleAtom: RecoilValue<number[] | undefined>;
      if (sectionId) rumbleAtom = getBySectionId(sectionId);
      else rumbleAtom = ids;

      if (!phases) {
        const rumbleIdList = get(rumbleAtom) || [];

        enableLogs && console.log('returning new ids', rumbleIdList);
        return rumbleIdList;
      } else {
        const rumbleIdList = get(rumbleAtom) || [];
        enableLogs && console.log('got previous ids', rumbleIdList);

        const filteredRumbles = rumbleIdList.filter((id) => {
          const rumble = get(getById(id));
          // Rumble will be included if not set? We can load it later?
          enableLogs &&
            console.log('filtering based on phase', { phases, rumble });
          if (!rumble) return true;
          else return !rumble.phase || phases.includes(rumble.phase);
        });
        enableLogs && console.log('filtered', filteredRumbles);

        return filteredRumbles;
      }
    },
});

export const add = factories.AddSelectorFactory({
  key: 'addRumbles',
  getById,
  ids,
  onAfter: ({ set, get, newValues, enableLogs }) => {
    enableLogs && console.log('add rumble onAfter effect', { newValues });

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
      enableLogs && console.log('onAfter adding', newIds, 'to section', secId);

      const prevIds = get(getBySectionId(secId)) || [];
      enableLogs && console.log('previous ids', prevIds);

      const filteredIds = newIds.filter((nId) => !prevIds.includes(nId));
      enableLogs && console.log('merging the following', prevIds, filteredIds);

      set(getBySectionId(secId), [...prevIds, ...filteredIds]);
    });
  },
});

export const userHasSubmitted = selectorFamily<
  boolean,
  { rumbleId?: number; userId?: number }
>({
  key: 'userHasSubmittedForTheRumble',
  get:
    (ids) =>
    ({ get }) => {
      const submission = get(getIdByRumbleAndUser(ids));
      return submission !== undefined;
    },
});
