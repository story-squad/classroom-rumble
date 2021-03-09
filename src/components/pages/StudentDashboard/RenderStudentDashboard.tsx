import React from 'react';
import { Rumbles, Sections } from '../../../api';
import { StudentRumbleList } from './StudentRumbleList';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = ({
  rumbleList,
  sectionList,
}: IRenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashboard</h1>
      <StudentRumbleList rumbleList={rumbleList} />
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderStudentDashboard;
