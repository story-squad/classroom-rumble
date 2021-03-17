import React from 'react';
import { Sections } from '../../../../api';
import { SectionInfo } from '../../../common/SectionInfo';
import { StudentDashboardRumbleList } from '../StudentDashboardRumbleList';

const RenderStudentViewSection = ({
  section,
}: IRenderStudentViewSectionProps): React.ReactElement => {
  return (
    <>
      <SectionInfo section={section} />
      <div className="student-view-section">
        <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            <h3>Current Rumbles</h3>
            <h3>Past Rumbles</h3>
          </div>
        </div>
        <StudentDashboardRumbleList sections={[section]} />
      </div>
    </>
  );
};

interface IRenderStudentViewSectionProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewSection;
