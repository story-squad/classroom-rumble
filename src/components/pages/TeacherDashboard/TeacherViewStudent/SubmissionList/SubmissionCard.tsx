import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../api';
import { sections, students, submissions } from '../../../../../state';
import { Table } from '../../../../common';

const SubmissionCard = ({
  score,
  prompt,
  src,
  codename,
  ...submission
}: Submissions.ISubItem): React.ReactElement => {
  const { push } = useHistory();
  const student = useRecoilValue(students.current);
  const section = useRecoilValue(sections.current);
  const setCurrentSubmission = useSetRecoilState(submissions.selected);

  const openSubView = () => {
    const currentSubmission = {
      ...submission,
      score,
      prompt,
      src,
      codename,
    };
    setCurrentSubmission(submission.id);
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: currentSubmission,
    });
  };

  return (
    <Table.Row onClick={openSubView}>
      <Table.Col>{prompt}</Table.Col>
      <Table.Col>{score}</Table.Col>
    </Table.Row>
  );
};
export default SubmissionCard;
