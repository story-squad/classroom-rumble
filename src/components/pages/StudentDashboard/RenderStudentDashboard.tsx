import React from 'react';
import { WelcomeModal } from '../../common';
import { StudentDashboardRumbleList } from './StudentDashboardRumbleList';
import { StudentSectionList } from './StudentSectionList';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = (): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <WelcomeModal />
      <StudentDashboardRumbleList />
      <StudentSectionList />
    </div>
  );
};

export default RenderStudentDashboard;
