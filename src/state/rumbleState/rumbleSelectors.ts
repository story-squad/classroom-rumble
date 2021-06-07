import { DefaultValue, RecoilValue, selector, selectorFamily } from 'recoil';
import { Rumbles } from '../../api';
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

export const add = selector<
  Rumbles.IRumbleWithSectionInfo[] | Rumbles.IRumbleWithSectionInfo | undefined
>({
  key: 'addRumble',
  get: () => undefined,
  set: ({ set, get }, newValue) => {
    // Initialize/Clear
    if (!newValue || newValue instanceof DefaultValue) return undefined;

    // Get the current id list
    const idList = get(ids) || [];

    // We're going to ALWAYS run logic on this array
    let items: Rumbles.IRumbleWithSectionInfo[];

    // So if our payload is an array already
    if (Array.isArray(newValue)) {
      // We can use that value
      items = newValue;
    } else {
      // Otherwise, it's a singular value and we need to put it in an array
      items = [newValue];
    }

    // Keep track of the ids of the new items -> only need to loop once
    const newIds: number[] = [];
    // Do the loop
    items.forEach((item) => {
      // Let's ensure we don't add duplicates to our idList
      if (idList.indexOf(item.id) === -1) {
        // Save each id in our handy array
        newIds.push(item.id);
      }

      // Use the atomFamily to set the specific rumble data or update the previous one
      set(getById(item.id), item);
    });
    // Update the id list as well
    const updatedIds = [...idList, ...newIds];

    set(ids, (prev) => [...(prev || []), ...updatedIds]);
  },
});
