import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { Sections } from '../../../../api';
import { SectionInfo } from '../../../common';
import { StudentRumbleList } from '../StudentRumbleList';
const RenderStudentViewSection = ({
  section,
}: IRenderStudentViewRumblesProps): React.ReactElement => {
  const currentRumbles = useMemo(
    () =>
      section.rumbles.filter(
        (rumble) =>
          !rumble.end_time ||
          DateTime.fromISO(`${rumble.end_time}`) < DateTime.now(),
      ),
    [section.rumbles],
  );
  const pastRumbles = useMemo(
    () =>
      section.rumbles.filter(
        (rumble) =>
          !rumble.end_time ||
          DateTime.fromISO(`${rumble.end_time}`) < DateTime.now(),
      ),
    [section.rumbles],
  );
  return (
    <>
      <SectionInfo section={section} />
      <div className="student-view-section">
        <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            <h3>Current Rumbles</h3>
            <StudentRumbleList rumbleList={currentRumbles} />
            <h3>Past Rumbles</h3>
            <StudentRumbleList rumbleList={pastRumbles} />
          </div>
        </div>
      </div>
    </>
  );
};

interface IRenderStudentViewRumblesProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewSection;
