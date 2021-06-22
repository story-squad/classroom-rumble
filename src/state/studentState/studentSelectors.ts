import { selector } from 'recoil';
import { Students, Submissions } from '../../api';
import { factories } from '../helpers';
import {
  add as addSubmissions,
  getIdByRumbleAndUser,
} from '../submissionState';
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
  onAfter: ({ set, newValues }) => {
    // Make sure that students' submissions are added to state and mapped to them by rumble and student ids
    const newSubs: Submissions.ISubItem[] = [];

    newValues.forEach((student) => {
      student.submissions.forEach((sub) => {
        newSubs.push(sub);
        set(
          getIdByRumbleAndUser({ rumbleId: sub.rumbleId, userId: student.id }),
          sub.id,
        );
      });
    });
    set(addSubmissions, newSubs);
  },
});
