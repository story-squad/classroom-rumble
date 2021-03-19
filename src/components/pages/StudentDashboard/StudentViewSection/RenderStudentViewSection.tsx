import React from 'react';
import { Sections } from '../../../../api';
import { useRumbleFilter } from '../../../../hooks';
import { SectionInfo } from '../../../common';
import { StudentRumbleList } from '../StudentRumbleList';
const RenderStudentViewSectionRumbles = ({
  section,
}: IRenderStudentViewSectionRumblesProps): React.ReactElement => {
  const [currentRumbles, pastRumbles] = useRumbleFilter(section.rumbles);

  return (
    <>
      <SectionInfo section={section} />
      <div className="student-view-section">
        <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            <h3>Current Rumbles</h3>
            <StudentRumbleList rumbles={currentRumbles} />
            <h3>Past Rumbles</h3>
            <StudentRumbleList rumbles={pastRumbles} />
          </div>
        </div>
      </div>
    </>
  );
};

interface IRenderStudentViewSectionRumblesProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewSectionRumbles;
