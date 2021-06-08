import React from 'react';
import { useRecoilValue } from 'recoil';
import { sections, students, submissions } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSubmission from './RenderTeacherViewSubmission';

const TeacherViewSubmissionContainer = (): React.ReactElement => {
  const sectionId = useRecoilValue(sections.selected);
  const studentId = useRecoilValue(students.selected);
  const submissionId = useRecoilValue(submissions.selected);

  return sectionId && studentId && submissionId ? (
    <RenderTeacherViewSubmission
      sectionId={sectionId}
      studentId={studentId}
      submissionId={submissionId}
    />
  ) : (
    <Loader message={'Loading submission'} />
  );
};

export default TeacherViewSubmissionContainer;
