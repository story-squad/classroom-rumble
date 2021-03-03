import { atom } from 'recoil';
import { IPrompt, IPromptInQueue } from '../../api/Prompts';

export const queue = atom<IPromptInQueue[] | undefined>({
  key: 'promptQueue',
  default: undefined,
});

export const list = atom<IPrompt[]>({
  key: 'promptList',
  default: [],
});

export const promptOffset = atom({
  key: 'promptOffset',
  default: 0,
});
