import React from 'react';
import { ISection } from '../../../../api/Sections';
import StudentSection from './StudentSection';

const RenderStudentSectionList = ({
  studentSections,
}: RenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="section-list-wrapper">
      <h1>YOUR SECTIONS</h1>
      <div className="section-list">
        {studentSections?.map((sec) => (
          <StudentSection {...sec} key={sec.id} />
        ))}
      </div>
    </div>
  );
};

interface RenderStudentDashboardProps {
  studentSections: ISection[];
}

export default RenderStudentSectionList;
