import React from 'react';
import { ISection } from '../../../../api/Sections';

const StudentSectionlist = ({
  studentSections,
}: RenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="section-list">
      <h1>YOUR SECTIONS</h1>
      {studentSections?.map((sec) => {
        <div key={sec.id}>
          {sec.name}
          {sec.active}
          {sec.grade}
          {sec.subject}
          {sec.joinCode}
        </div>;
      })}
    </div>
  );
};

interface RenderStudentDashboardProps {
  studentSections: ISection[];
}

export default StudentSectionlist;
