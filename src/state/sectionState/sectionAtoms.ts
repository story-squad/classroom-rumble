import { atom, atomFamily, selector } from 'recoil';
import { Sections } from '../../api';
import { logger, persist } from '../effects';
import { current } from '../rumbleState';

export const ids = atom<number[] | undefined>({
  key: 'sectionIds',
  default: undefined,
});

export const getById = atomFamily<
  Sections.ISectionWithRumbles | undefined,
  number
>({
  key: 'sectionById',
  default: undefined,
});

export const selected = atom<number | undefined>({
  key: 'selectedSection',
  default: selector<number | undefined>({
    key: 'defaultSelectedSectionSelector',
    get: ({ get }) => {
      const currentRumble = get(current);
      return currentRumble?.sectionId; // Returns undefined if unset
    },
  }),
  effects_UNSTABLE: [persist('section:selected'), logger()],
});
