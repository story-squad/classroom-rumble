import React from 'react';
import { Submissions } from '../../../../../api';
import SubmissionCard from './SubmissionCard';

const RenderSubmissionList = ({
  submissionList,
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
  submissionList: Submissions.ISubmission[];
}

export default RenderSubmissionList;
