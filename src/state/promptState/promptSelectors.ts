import { selector } from 'recoil';
import { Prompts } from '../../api';
import { factories } from '../helpers';
import { getById, ids, selected } from './promptAtoms';

export const current = selector<Prompts.IPromptInQueue | undefined>({
  key: 'currentlySelectedPrompt',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const rumble = get(getById(currentId));
    return rumble;
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addPrompt',
  getById,
  ids,
});
