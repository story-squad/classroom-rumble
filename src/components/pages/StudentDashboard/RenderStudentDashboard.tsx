import React from 'react';
import { StudentSectionList } from './StudentSectionList';
import { Route } from 'react-router-dom';
import { JoinSectionRedirect } from './JoinSectionRedirect';

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
      <StudentSectionList />
    </div>
  );
};

export default RenderStudentDashboard;
