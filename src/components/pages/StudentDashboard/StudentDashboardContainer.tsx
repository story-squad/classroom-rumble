import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sections } from '../../../state';
import { Header } from '../../common';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import RenderStudentDashboard from './RenderStudentDashboard';
import { StudentProfile } from './StudentProfilePage';
import { StudentViewRumble } from './StudentViewRumble';
import { StudentViewSectionRumbles } from './StudentViewSectionRumbles';

const StudentDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);

  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/dashboard/student"
          render={() => <RenderStudentDashboard sectionList={sectionList} />}
        />
        <Route
          exact
          path="/dashboard/student/join"
          component={JoinSectionRedirect}
        />
        <Route
          exact
          path="/dashboard/student/section"
          component={() => <StudentViewSectionRumbles />}
        />
        <Route
          exact
          path="/dashboard/student/profile"
          component={() => <StudentProfile />}
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
