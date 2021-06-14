import { atom, atomFamily } from 'recoil';
import { Sections } from '../../api';
import { logger, persist } from '../effects';

export const ids = atom<number[] | undefined>({
  key: 'sectionIds',
  default: undefined,
  effects_UNSTABLE: [logger()],
});

export const getById = atomFamily<
  Sections.ISectionWithRumbles | undefined,
  number
>({
  key: 'sectionById',
  default: undefined,
  effects_UNSTABLE: [logger()],
});

export const selected = atom<number | undefined>({
  key: 'selectedSection',
  default: undefined,
  effects_UNSTABLE: [persist('section:selected')],
});
