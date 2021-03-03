import React from 'react';
import { Auth, Submissions } from '../../../../../api';
import SubmissionCard from './SubmissionCard';

const RenderSubmissionList = ({
  submissionList,
  student,
}: IRenderSubmissionListProps): React.ReactElement => {
  return (
    <div className="submission-list-wrapper">
      <h2>Submissions</h2>
      <div className="submission-list">
        {submissionList.map((sub) => (
          <SubmissionCard {...sub} key={sub.id} />
        ))}
      </div>
    </div>
  );
};

interface IRenderSubmissionListProps {
  submissionList: Submissions.ISubItem[];
  student: Auth.IUser;
}

export default RenderSubmissionList;
