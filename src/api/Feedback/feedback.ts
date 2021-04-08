// GET /api/rumble/rumbles/:rumbleId/feedback?studentId=:studentId`
// pull it into its own file in future?

import { axiosWithAuth } from '../axiosWithConfig';
import { IFeedback } from './feedbackTypes';

// Should This be in Submissions?

export const getSubmissionFeedback = async (
  rumbleId: number,
  studentId: number,
): Promise<IFeedback[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/rumbles/${rumbleId}/feedback?studentId=${studentId}`,
  );
  // *** DUMMY DATA ***
  //   const data: IFeedback[] = [
  //     { id: 1, voterId: 2, submissionId: 1, score1: 3, score2: 1, score3: 5 },
  //   ];
  return data;
};
