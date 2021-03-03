import React, { useState } from 'react';
import { Rumbles, Sections } from '../../../api';
import { RumbleList, SectionList } from '../../common';
import { CreateNewRumble } from './CreateNewRumble';
import { CreateNewSection } from './CreateNewSection';
import { PromptQueueDisplay } from './PromptQueueDisplay';

const RenderTeacherDashboard = ({
  sectionList,
  rumbleList,
}: IRenderTeacherDashboardProps): React.ReactElement => {
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  const [newRumbleOpen, setNewRumbleOpen] = useState(false);
  return (
    <div className="teacher-dashboard">
      <CreateNewSection
        isVisible={newSectionOpen}
        setIsVisible={setNewSectionOpen}
      />
      <CreateNewRumble
        isVisible={newRumbleOpen}
        setIsVisible={setNewRumbleOpen}
      />
      <h1>Dashboard</h1>
      <PromptQueueDisplay />
      {rumbleList ? (
        <RumbleList rumbles={rumbleList} openNewRumbleForm={setNewRumbleOpen} />
      ) : (
        <p>Loading Rumbles...</p>
      )}
      {sectionList ? (
        <SectionList
          sections={sectionList}
          openNewSectionForm={setNewSectionOpen}
        />
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
