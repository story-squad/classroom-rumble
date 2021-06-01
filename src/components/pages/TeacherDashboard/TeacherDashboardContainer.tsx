import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../../common';
import { CreateNewRumble } from './CreateNewRumble';
import RenderTeacherDashboard from './RenderTeacherDashboard';
import { TeacherViewRumble } from './TeacherViewRumble';
import { TeacherViewSection } from './TeacherViewSection';
import { TeacherViewStudent } from './TeacherViewStudent';
import { TeacherViewSubmission } from './TeacherViewSubmission';

const TeacherDashboardContainer = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/dashboard/teacher"
          render={() => <RenderTeacherDashboard />}
        />
        <Route
          exact
          path="/dashboard/teacher/section"
          render={() => <TeacherViewSection />}
        />
        <Route
          exact
          path="/dashboard/teacher/rumble"
          render={() => <TeacherViewRumble />}
        />
        <Route
          exact
          path="/dashboard/teacher/student"
          render={() => <TeacherViewStudent />}
        />
        <Route
          exact
          path="/dashboard/teacher/submission"
          render={() => <TeacherViewSubmission />}
        />
        <Route
          exact
          path="/dashboard/teacher/rumble/new"
          render={(props) => <CreateNewRumble {...props} />}
        />
        {/* Fallback redirect for nonexistent routes */}
        <Route
          path="/dashboard/teacher"
          component={() => <Redirect to="/dashboard/teacher" />}
        />
      </Switch>
    </>
  );
};

export default TeacherDashboardContainer;
