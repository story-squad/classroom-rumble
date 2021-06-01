import { selector } from 'recoil';
import { Students } from '../../api';
import { factories } from '../helpers';
import { getById, ids, selected } from './studentAtoms';

export const current = selector<Students.IStudentWithSubmissions | undefined>({
  key: 'currentlySelectedStudent',
  get: ({ get }) => {
    const currentId = get(selected);
    if (!currentId) return undefined;

    const submission = get(getById(currentId));
    return submission;
  },
});

export const add = factories.AddSelectorFactory({
  key: 'addStudent',
  getById,
  ids,
});
