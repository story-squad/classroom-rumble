export interface IFeedback extends INewFeedback {
  id: number;
}

export interface INewFeedback extends IFeedbackScores {
  voterId: number;
  submissionId: number;
}

export interface IFeedbackScores {
  score1?: number;
  score2?: number;
  score3?: number;
}

export interface IFeedbackQuestions {
  question: string;
  lowLabel: string;
  highLabel: string;
  score?: number;
}
