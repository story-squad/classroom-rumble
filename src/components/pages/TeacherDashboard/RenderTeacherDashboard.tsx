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
      <h1>Dashboard</h1>
      <PromptQueueDisplay />
      {sectionList ? (
        <SectionList sections={sectionList} />
      ) : (
        <p>Loading Sections...</p>
      )}
      {rumbleList ? (
        <RumbleList rumbles={rumbleList} />
      ) : (
        <p>Loading Rumbles...</p>
      )}
    </div>
  );
};

interface IRenderTeacherDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderTeacherDashboard;
