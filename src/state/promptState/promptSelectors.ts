import { factories } from '../helpers';
import { getById, ids } from './promptAtoms';

export const add = factories.AddSelectorFactory({
  key: 'addPrompt',
  getById,
  ids,
});
