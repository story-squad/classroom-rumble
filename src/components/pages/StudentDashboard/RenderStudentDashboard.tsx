import React from 'react';
import { Route } from 'react-router-dom';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import { StudentList } from './StudentSectionList';

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
      <StudentList />
    </div>
  );
};

export default RenderStudentDashboard;
