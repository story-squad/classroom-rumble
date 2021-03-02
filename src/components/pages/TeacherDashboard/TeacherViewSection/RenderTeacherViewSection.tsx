import React from 'react';
import { Sections } from '../../../../api';
import { RumbleList } from '../../../common';

const RenderTeacherViewSection = ({
  name,
  gradeId,
  subjectId,
  joinCode,
  id,
  rumbles,
}: Sections.ISectionWithRumbles): React.ReactElement => {
  return (
    <div className="teacher-view-section">
      <h2>View Section</h2>
      <RumbleList
        rumbles={rumbles.map((r) => ({
          ...r,
          sectionName: name,
          sectionId: id,
        }))}
      />
    </div>
  );
};

export default RenderTeacherViewSection;
