// GET /api/rumble/rumbles/:rumbleId/feedback?studentId=:studentId`
// pull it into its own file in future?

import { axiosWithAuth } from '../axiosWithConfig';
import { IFeedback } from './feedbackTypes';

// Should This be in Submissions?

export const getSubmissionFeedback = async (
  submissionId: number,
): Promise<IFeedback[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/submissions/${submissionId}/feedback`,
  );
  // *** DUMMY DATA ***
  // const data: IFeedback[] = [
  //   { id: 1, voterId: 2, submissionId: 1, score1: 3, score2: 1, score3: 5 },
  //   { id: 3, voterId: 3, submissionId: 2, score1: 4, score2: 2, score3: 5 },
  //   { id: 2, voterId: 1, submissionId: 3, score1: 5, score2: 4, score3: 5 },
  // ];
  return data;
};

export const startFeedback = async (rumbleId: number): Promise<void> => {
  await axiosWithAuth().put(`/api/rumble/rumbles/${rumbleId}/feedback/start`);
};

// TODO rename this
export const checkIfHasSubmittedFeedback = async ({
  rumbleId,
  studentId,
}: {
  rumbleId: number;
  studentId: number;
}): Promise<boolean> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/feedback/complete?studentId=${studentId}&rumbleId=${rumbleId}`,
  );
  return data;
};
