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
}: {
  key: string;
  ids: RecoilState<IdType[] | undefined>;
  getById: (id: IdType) => RecoilState<DataType | undefined>;
  onAfter?: (arg: {
    updatedIds: IdType[];
    newValues: DataType[];
    set: SetRecoilState;
    get: GetRecoilValue;
  }) => void;
}): RecoilState<DataType[] | DataType | undefined> =>
  selector<DataType[] | DataType | undefined>({
    key,
    get: () => undefined,
    set: ({ set, get }, newValue) => {
      console.group(`${key} updated`);
      console.log('new', newValue);

      // Initialize/Clear
      if (!newValue || newValue instanceof DefaultValue) return undefined;

      // Get the current id list
      const idList = get(idListAtom) || [];
      // console.log('ids', idList);

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
      // console.log('items', items);

      // Keep track of the ids of the new items -> only need to loop once
      const newIds: IdType[] = [];
      // Do the loop
      items.forEach((item) => {
        // Let's ensure we don't add duplicates to our idList
        if (idList.indexOf(item.id) === -1) {
          // console.log('adding id', item.id);
          // Save each id in our handy array
          newIds.push(item.id);
        }

        // console.log('updating', item.id, item);
        // Use the atomFamily to set the specific rumble data or update the previous one
        set(atomFamilyGetById(item.id), item);
      });

      // console.log('updating ids', idList, newIds);
      // Update the id list as well
      const updatedIds = [...idList, ...newIds];
      set(idListAtom, (prev) => (prev ? [...prev, ...newIds] : newIds));

      // console.log('running onAfter');
      onAfter?.({
        updatedIds,
        newValues: items,
        set,
        get,
      });
      // console.log('completed onAfter');

      console.groupEnd();
    },
  });
