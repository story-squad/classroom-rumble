import React from 'react';
import { Rumbles, Sections } from '../../../api';
import { SectionList } from '../../common';
import { PromptBox } from '../../common/PromptBox';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = ({
  rumbleList,
  sectionList,
}: IRenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashboard</h1>
      <SectionList sections={sectionList} />
      <PromptBox />
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderStudentDashboard;
