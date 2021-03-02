import React from 'react';
import { Route } from 'react-router-dom';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import { StudentRumbleList } from './StudentRumbleList';
import { StudentSectionList } from './StudentSectionList';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = (): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashboard</h1>
      <Route
        exact
        path="/dashboard/student/join"
        component={JoinSectionRedirect}
      />
      <StudentRumbleList />
      <StudentSectionList />
    </div>
  );
};

export default RenderStudentDashboard;
