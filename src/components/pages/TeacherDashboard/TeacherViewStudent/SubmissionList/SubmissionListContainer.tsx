import React, { useEffect, useState } from 'react';
import { Sections, Students, Submissions } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderSubmissionList from './RenderSubmissionList';

const SubmissionListContainer = ({
  student,
  section,
}: ISubmissionListContainerProps): React.ReactElement => {
  const [subList, setSubList] = useState<Submissions.ISubItem[]>(
    student.submissions,
  );

  const [getSubsForStudentInSection, loading, , error] = useAsync({
    asyncFunction: Submissions.getSubsForStudentInSection,
    setter: setSubList,
  });

  useEffect(() => {
    if (!subList) {
      getSubsForStudentInSection(student.id, section.id);
    }
  }, []);

  return subList ? (
    <RenderSubmissionList student={student} submissionList={subList} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : loading ? (
    <Loader message={'Loading students'} />
  ) : (
    <>Could not load students</>
  );
};

interface ISubmissionListContainerProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISection;
}

export default SubmissionListContainer;
