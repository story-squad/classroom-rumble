import { atom } from 'recoil';
import { IPromptInQueue } from '../../api/Prompts';

export const queue = atom<IPromptInQueue[] | undefined>({
  key: 'promptQueue',
  default: undefined,
});
