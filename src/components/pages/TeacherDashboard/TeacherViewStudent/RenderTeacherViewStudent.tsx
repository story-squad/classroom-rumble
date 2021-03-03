import React from 'react';
import { Auth, Sections } from '../../../../api';
import { SubmissionList } from './SubmissionList';

const RenderTeacherViewStudent = ({
  section,
  student,
}: IRenderTeacherViewStudentProps): React.ReactElement => {
  return (
    <div className="teacher-view-student">
      <h2>
        {student.firstname} {student.lastname} <em>({student.codename})</em>
      </h2>
      <div className="student-info">
        <div>Email: {student.email}</div>
      </div>
      <SubmissionList student={student} section={section} />
    </div>
  );
};

interface IRenderTeacherViewStudentProps {
  student: Auth.IUser;
  section: Sections.ISection;
}

export default RenderTeacherViewStudent;
