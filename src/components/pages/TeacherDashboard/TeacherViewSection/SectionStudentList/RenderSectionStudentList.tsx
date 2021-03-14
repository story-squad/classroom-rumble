import React from 'react';
import { Sections, Students } from '../../../../../api';
import SectionStudentCard from './SectionStudentCard';

const RenderSectionStudentList = ({
  studentList,
  section,
}: IRenderSectionStudentListProps): React.ReactElement => {
  return (
    <div className="student-list-wrapper">
      <div className="student-list-container">
        <div className="student-list">
          <div className="list-header">
            <div className="list-header-col">Student Name</div>
            <div className="list-header-col">Last Name</div>
            <div className="list-header-col">First Name</div>
            <div className="list-header-col"># of Submissions</div>
          </div>
          <div className="list-body">
            {studentList.map((student) => (
              <SectionStudentCard
                student={student}
                section={section}
                key={student.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IRenderSectionStudentListProps {
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderSectionStudentList;
