import React from 'react';
import { Rumbles, Sections } from '../../../api';
import { RumbleList, SectionList } from '../../common';
import { PromptQueueDisplay } from './PromptQueueDisplay';

const RenderTeacherDashboard = ({
  sectionList,
  rumbleList,
}: IRenderTeacherDashboardProps): React.ReactElement => {
  return (
    <div className="teacher-dashboard">
      <PromptQueueDisplay />
      {rumbleList ? (
        <RumbleList rumbles={rumbleList} isTeacher />
      ) : (
        <p>Loading Rumbles...</p>
      )}
      {sectionList ? (
        <SectionList sections={sectionList} isTeacher />
      ) : (
        <p>Loading Sections...</p>
      )}
    </div>
  );
};

interface IRenderTeacherDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderTeacherDashboard;
