import React, { useState } from 'react';
import { Submissions } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderSubmissionList from './RenderSubmissionList';

const SubmissionListContainer = ({
  studentId,
}: ISubmissionListContainerProps): React.ReactElement => {
  const [subList, setSubList] = useState<Submissions.ISubmission[]>();
  const [error, setError] = useState<string>();

  return subList ? (
    <RenderSubmissionList submissionList={subList} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading submissions...</p>
  );
};

interface ISubmissionListContainerProps {
  studentId: number;
}

export default SubmissionListContainer;
