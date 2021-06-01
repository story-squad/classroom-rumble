import { selector } from 'recoil';
import { Submissions } from '../../api';
import { factories } from '../helpers';
import { getById, ids, selected } from './submissionAtoms';

export const current = selector<Submissions.ISubItem | undefined>({
  key: 'currentlySelectedSubmission',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const submission = get(getById(currentId));
    return submission;
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addSubmission',
  getById,
  ids,
});
