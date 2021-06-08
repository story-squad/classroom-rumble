import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../api';
import { submissions } from '../../../../../state';
import { Table } from '../../../../common';

// TODO ask UX for a design for this student view page?
const SubmissionCard = ({
  score,
  prompt,
  ...submission
}: Submissions.ISubItem): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSubmission = useSetRecoilState(submissions.selected);

  const openSubView = () => {
    setCurrentSubmission(submission.id);
    push('/dashboard/teacher/submission');
  };

  return (
    <Table.Row onClick={openSubView}>
      <Table.Col>{prompt}</Table.Col>
      <Table.Col>{score}</Table.Col>
    </Table.Row>
  );
};
export default SubmissionCard;
