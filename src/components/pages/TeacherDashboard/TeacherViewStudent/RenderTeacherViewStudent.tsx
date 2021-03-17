import React from 'react';
import { Sections, Students } from '../../../../api';
import { SubmissionList } from './SubmissionList';

const RenderTeacherViewStudent = ({
  section,
  student,
}: IRenderTeacherViewStudentProps): React.ReactElement => {
  return (
    <div className="teacher-view-student">
      <div className="student-info-wrapper">
        <div className="student-info-container">
          <div className="content">
            <div className="content-item">
              <h3>Student Name</h3>
              <h4>
                {student.firstname} {student.lastname}
              </h4>
            </div>
            <div className="content-item">
              <h3>Codename</h3>
              <h4>{student.codename}</h4>
            </div>
            <div className="content-item">
              <h3>Email</h3>
              <h4>{student.email}</h4>
            </div>
          </div>
        </div>
      </div>
      <SubmissionList student={student} section={section} />
    </div>
  );
};

interface IRenderTeacherViewStudentProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISection;
}

export default RenderTeacherViewStudent;
