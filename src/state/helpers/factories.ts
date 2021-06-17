import {
  DefaultValue,
  GetRecoilValue,
  RecoilState,
  selector,
  SetRecoilState,
} from 'recoil';

export const AddSelectorFactory = <IdType, DataType extends { id: IdType }>({
  key,
  ids: idListAtom,
  getById: atomFamilyGetById,
  onAfter,
  enableLogs,
}: {
  key: string;
  ids: RecoilState<IdType[] | undefined>;
  getById: (id: IdType) => RecoilState<DataType | undefined>;
  onAfter?: (arg: {
    updatedIds: IdType[];
    newValues: DataType[];
    set: SetRecoilState;
    get: GetRecoilValue;
    newIds: IdType[];
    enableLogs?: boolean;
  }) => void;
  enableLogs?: boolean;
}): RecoilState<DataType[] | DataType | undefined> =>
  // Selector code starts here
  selector<DataType[] | DataType | undefined>({
    key,
    get: () => undefined,
    set: ({ set, get }, newValue) => {
      enableLogs && console.log(`adding to ${key}`, { key, newValue });
      enableLogs && console.log('new', newValue, { key, newValue });

      // Initialize/Clear
      if (!newValue || newValue instanceof DefaultValue) return undefined;

      // Get the current id list
      const idList = get(idListAtom) || [];
      enableLogs && console.log('ids', idList, { key, newValue });

      // We're going to ALWAYS run logic on this array
      let items: DataType[];

      // So if our payload is an array already
      if (Array.isArray(newValue)) {
        // We can use that value
        items = newValue;
      } else {
        // Otherwise, it's a singular value and we need to put it in an array
        items = [newValue];
      }
      enableLogs && console.log('items', items, { key, newValue });

      // Keep track of the ids of the new items -> only need to loop once
      const newIds: IdType[] = [];
      // Do the loop
      items.forEach((item) => {
        // Let's ensure we don't add duplicates to our idList
        if (idList.indexOf(item.id) === -1) {
          enableLogs &&
            console.log('adding id', item.id, 'to', newIds, { key, newValue });
          // Save each id in our handy array
          newIds.push(item.id);
        }

        enableLogs && console.log('updating', item.id, item, { key, newValue });
        // Use the atomFamily to set the specific rumble data or update the previous one
        set(atomFamilyGetById(item.id), item);
      });
      // Create a list that merges the original (idList) as well as the new ids (newIds)
      const updatedIds = [...idList, ...newIds];

      enableLogs &&
        console.log('updating ids', idList, newIds, updatedIds, {
          key,
          newValue,
        });

      // Updated the id list atom
      set(idListAtom, updatedIds);

      // Allows us to (optionally) run a side effect on new resources every time they are added
      enableLogs &&
        onAfter &&
        console.log('running onAfter', { key, newValue });
      onAfter?.({
        newIds,
        updatedIds,
        newValues: items,
        set,
        get,
        enableLogs,
      });
      enableLogs &&
        onAfter &&
        console.log('completed onAfter', { key, newValue });

      enableLogs && console.log('completed', key, { key, newValue });
    },
  });
