import { atom, atomFamily } from 'recoil';
import { Prompts } from '../../api';
import { persist } from '../effects';

// TODO inline documentation for what this data even is

export const ids = atom<number[] | undefined>({
  key: 'promptIds',
  default: undefined,
});

export const customIds = atom<number[]>({
  key: 'customPromptIds',
  default: [],
});

export const queueIds = atom<number[] | undefined>({
  key: 'promptQueueIds',
  default: undefined,
});

export const getById = atomFamily<
  Prompts.IPromptInQueue | undefined,
  number | undefined
>({
  key: 'promptById',
  default: undefined,
});

export const selected = atom<number | undefined>({
  key: 'selectedPrompt',
  default: undefined,
  effects_UNSTABLE: [persist('prompt:selected')],
});
