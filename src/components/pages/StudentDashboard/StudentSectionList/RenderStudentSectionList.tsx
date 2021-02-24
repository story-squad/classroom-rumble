import React from 'react';
import { ISection } from '../../../../api/Sections';
import StudentSectionlist from './StudentSectionsList';

const RenderStudentSectionList = ({
  studentSections,
}: RenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-section-list">
      <StudentSectionlist studentSections={studentSections} />
    </div>
  );
};

interface RenderStudentDashboardProps {
  studentSections: ISection[];
}

export default RenderStudentSectionList;
