import { atom } from 'recoil';
import { Prompts } from '../../api';
import { IPrompt, IPromptInQueue } from '../../api/Prompts';

export const queue = atom<IPromptInQueue[] | undefined>({
  key: 'promptQueue',
  default: undefined,
});

export const list = atom<IPrompt[]>({
  key: 'promptList',
  default: [],
});

export const customList = atom<IPromptInQueue[]>({
  key: 'customPromptList',
  default: [],
});

export const promptOffset = atom({
  key: 'promptOffset',
  default: 0,
});
export const currentPrompt = atom<Prompts.IPrompt | null>({
  key: 'currentPrompt',
  default: null,
});
