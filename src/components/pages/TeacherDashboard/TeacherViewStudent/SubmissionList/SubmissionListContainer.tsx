import React, { useState } from 'react';
import { Auth, Submissions } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderSubmissionList from './RenderSubmissionList';

const SubmissionListContainer = ({
  student,
}: ISubmissionListContainerProps): React.ReactElement => {
  const [subList, setSubList] = useState<Submissions.ISubmission[]>();
  const [error, setError] = useState<string>();

  return subList ? (
    <RenderSubmissionList student={student} submissionList={subList} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading submissions...</p>
  );
};

interface ISubmissionListContainerProps {
  student: Auth.IUser;
}

export default SubmissionListContainer;
