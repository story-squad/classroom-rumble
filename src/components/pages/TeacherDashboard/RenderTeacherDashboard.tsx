import React, { useState } from 'react';
import { Rumbles, Sections } from '../../../api';
import { RumbleList, SectionList } from '../../common';
import { CreateNewSection } from './CreateNewSection';
import { PromptQueueDisplay } from './PromptQueueDisplay';

const RenderTeacherDashboard = ({
  sectionList,
  rumbleList,
}: IRenderTeacherDashboardProps): React.ReactElement => {
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  return (
    <div className="teacher-dashboard">
      <CreateNewSection
        isVisible={newSectionOpen}
        setIsVisible={setNewSectionOpen}
      />
      <h1>Dashboard</h1>
      <PromptQueueDisplay />
      {sectionList ? (
        <SectionList
          sections={sectionList}
          openNewSectionForm={setNewSectionOpen}
        />
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
