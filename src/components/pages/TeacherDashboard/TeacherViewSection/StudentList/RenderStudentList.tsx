import React from 'react';
import { Auth, Sections } from '../../../../../api';
import StudentCard from './StudentCard';

const RenderStudentList = ({
  studentList,
  section,
}: IRenderStudentListProps): React.ReactElement => {
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

interface IRenderStudentListProps {
  studentList: Auth.IUser[];
  section: Sections.ISection;
}

export default RenderStudentList;
