import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../api';
import { current } from '../../../../../state';

const SubmissionCard = ({
  score,
  prompt,
  src,
  codename,
  ...submission
}: Submissions.ISubItem): React.ReactElement => {
  const { push } = useHistory();
  const student = useRecoilValue(current.student);
  const section = useRecoilValue(current.section);
  const setCurrentSubmission = useSetRecoilState(current.sub);

  const openSubView = () => {
    const currentSubmission = {
      ...submission,
      score,
      prompt,
      src,
      codename,
    };
    setCurrentSubmission(currentSubmission);
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: currentSubmission,
    });
  };

  return (
    <div className="submission-card" onClick={openSubView}>
      <h3>
        {codename} - {score}
      </h3>
      <img width="100" height="100" src={src} alt="" />
      <p>{prompt}</p>
    </div>
  );
};
export default SubmissionCard;
