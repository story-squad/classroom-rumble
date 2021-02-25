import React from 'react';
import { ISection } from '../../../../api/Sections';
import TeacherSection from './TeacherSections';

const RenderTeacherSectionList = ({
  teacherSections,
}: RenderTeacherDashboardProps): React.ReactElement => {
  return (
    <div className="section-list-wrapper">
      <h1>YOUR SECTIONS</h1>
      <div className="section-list">
        {teacherSections?.map((sec) => (
          <TeacherSection {...sec} key={sec.id} />
        ))}
      </div>
    </div>
  );
};

interface RenderTeacherDashboardProps {
  teacherSections: ISection[];
}

export default RenderTeacherSectionList;
