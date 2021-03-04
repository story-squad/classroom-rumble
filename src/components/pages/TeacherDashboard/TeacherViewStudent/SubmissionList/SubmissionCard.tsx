import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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

  const openSubView = () => {
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: {
        ...submission,
        score,
        prompt,
        src,
        codename,
      },
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
