import React from 'react';
import { Rumbles, Sections } from '../../../api';
import { StudentDashboardRumbleList } from './StudentDashboardRumbleList';
import { StudentRumbleList } from './StudentRumbleList';
import { StudentSectionList } from './StudentSectionList';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = ({
  sectionList,
}: IRenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashboard</h1>
      {sectionList ? (
        <>
          <StudentDashboardRumbleList sections={sectionList} />
          <StudentSectionList />
        </>
      ) : (
        <p>Loading Sections...</p>
      )}
      <StudentRumbleList />
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderStudentDashboard;
