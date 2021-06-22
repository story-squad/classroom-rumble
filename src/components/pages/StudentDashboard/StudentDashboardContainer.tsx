import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../../common';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import RenderStudentDashboard from './RenderStudentDashboard';
import { StudentViewRumble } from './StudentViewRumble';
import { RumbleComplete } from './StudentViewRumble/StudentRumblePages';
import { StudentViewSection } from './StudentViewSection';
import { ParentValidationModal } from './ValidationModal';

const StudentDashboardContainer = (): React.ReactElement => {
  return (
    <>
      <ParentValidationModal />
      <Header />
      <Switch>
        <Route
          exact
          path="/dashboard/student/join"
          component={JoinSectionRedirect}
        />
        <Route
          exact
          path="/dashboard/student"
          render={() => <RenderStudentDashboard />}
        />
        <Route
          exact
          path="/dashboard/student/section"
          component={() => <StudentViewSection />}
        />
        <Route
          exact
          path="/dashboard/student/complete"
          component={RumbleComplete}
        />
        {/* Route to the current rumble */}
        <Route
          exact
          path="/dashboard/student/rumble"
          render={() => <StudentViewRumble />}
        />
        {/* Fallback redirect for nonexistent routes */}
        <Route
          path="/dashboard/student"
          component={() => <Redirect to="/dashboard/student" />}
        />
      </Switch>
    </>
  );
};

export default StudentDashboardContainer;
