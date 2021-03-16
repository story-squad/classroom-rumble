import React from 'react';
import { Sections } from '../../../api';
import { StudentDashboardRumbleList } from './StudentDashboardRumbleList';
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
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default RenderStudentDashboard;
