import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sections } from '../../../state';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import RenderStudentDashboard from './RenderStudentDashboard';
import { StudentViewRumble } from './StudentViewRumble';

const StudentDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);

  return (
    <Switch>
      <Route
        exact
        path="/dashboard/student/join"
        component={JoinSectionRedirect}
      />
      <Route
        exact
        path="/dashboard/student"
        render={() => <RenderStudentDashboard sectionList={sectionList} />}
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
  );
};

export default StudentDashboardContainer;
