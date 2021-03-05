import React from 'react';
import { Sections, Students } from '../../../../../api';
import StudentCard from './SectionStudentCard';

const RenderSectionStudentList = ({
  studentList,
  section,
}: IRenderSectionStudentListProps): React.ReactElement => {
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

interface IRenderSectionStudentListProps {
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderSectionStudentList;
