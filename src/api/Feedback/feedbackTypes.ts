export interface IFeedback extends IFeedbackScores {
  id: number;
  voterId: number;
  submissionId: number;
}

// const x = [
//   { score1: 3, score2: 4, score3: 1 },
//   { score1: 3, score2: 4, score3: 1 },
//   { score1: 3, score2: 4, score3: 1 },
// ];

export interface IFeedbackScores {
  score1?: number;
  score2?: number;
  score3?: number;
}

export interface IFeedbackQuestions {
  question: string;
  lowRadioValue: string;
  highRadioValue: string;
}
