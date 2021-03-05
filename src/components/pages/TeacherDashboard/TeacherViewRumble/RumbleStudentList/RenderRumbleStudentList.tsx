import React from 'react';
import { Sections, Students } from '../../../../../api';
import StudentCard from './RumbleStudentCard';

const RenderRumbleStudentList = ({
  studentList,
  section,
}: IRenderRumbleStudentListProps): React.ReactElement => {
  return (
    <div className="student-list-wrapper">
      <h2>Students</h2>
      <div className="student-list">
        {studentList.map((student) => (
          <StudentCard student={student} section={section} key={student.id} />
        ))}
      </div>
    </div>
  );
};

interface IRenderRumbleStudentListProps {
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderRumbleStudentList;
