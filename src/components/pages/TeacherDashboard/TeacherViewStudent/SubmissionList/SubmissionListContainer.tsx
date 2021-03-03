import React, { useEffect, useState } from 'react';
import { Auth, Sections, Submissions } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderSubmissionList from './RenderSubmissionList';

const SubmissionListContainer = ({
  student,
  section,
}: ISubmissionListContainerProps): React.ReactElement => {
  const [subList, setSubList] = useState<Submissions.ISubItem[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!subList) {
      Submissions.getSubsForStudentInSection(student.id, section.id)
        .then((res) => {
          console.log({ subList: res });
          setSubList(res);
        })
        .catch((err) => {
          console.log({ err });
          setError(err.message);
        });
    }
  }, []);

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
  section: Sections.ISection;
}

export default SubmissionListContainer;
