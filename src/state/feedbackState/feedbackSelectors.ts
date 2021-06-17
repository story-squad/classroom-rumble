import { selectorFamily } from 'recoil';
import { IAverages } from '../../components/common/FeedbackDisplay/feedbackTypes';
import { factories } from '../helpers';
import { getById, getSubIdsByRumbleAndVoterId, ids } from './feedbackAtoms';

export const add = factories.AddSelectorFactory({
  key: 'addFeedback',
  getById,
  ids,
});

export const hasSubmitted = selectorFamily<
  boolean,
  { voterId?: number; rumbleId?: number }
>({
  key: 'voterHasSubmittedFeedback',
  get: (ids) => ({ get }) => {
    const voterFeedbackIds = get(getSubIdsByRumbleAndVoterId(ids));
    const res =
      voterFeedbackIds?.some((fId) => {
        const fbItem = get(getById(fId));
        return !!fbItem?.score1 || !!fbItem?.score2 || !!fbItem?.score3;
      }) ?? false;
    console.log({ voterFeedbackIds, res, ...ids });
    return res;
  },
});

// TODO move this type to be in a more reusable place
export const averages = selectorFamily<
  IAverages | undefined,
  number[] | undefined
>({
  key: 'getFeedbackAverages',
  get: (ids) => ({ get }) => {
    if (!ids) return;

    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    const count = [0, 0, 0];

    const feedback = ids.map((id) => get(getById(id)));
    feedback.forEach((fb) => {
      if (!fb) return;
      else {
        if (fb.score1 && fb.score1 > 0) {
          score1 += fb.score1;
          count[0]++;
        }
        if (fb.score2 && fb.score2 > 0) {
          score2 += fb.score2;
          count[1]++;
        }
        if (fb.score3 && fb.score3 > 0) {
          score3 += fb.score3;
          count[2]++;
        }
      }
    });

    score1 /= count[0];
    score2 /= count[1];
    score3 /= count[2];

    return {
      score1,
      score2,
      score3,
    };
  },
});

export const getIdsBySubId = selectorFamily<number[], number>({
  key: 'getFeedbackIdsBySubmissionId',
  get: (submissionId) => ({ get }) => {
    const feedbackIds = get(ids);
    // We need a way to fetch them
    if (!feedbackIds) return [];

    // Filter out all the fbItems with the wrong subId
    const res = feedbackIds.filter(
      (fid) => get(getById(fid))?.submissionId === submissionId,
    );

    // Return the filtered id list
    return res;
  },
});
