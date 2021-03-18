import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rumbles, sections } from '../../../state';
import { Header } from '../../common/Header';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import RenderStudentDashboard from './RenderStudentDashboard';
import { StudentViewRumble } from './StudentViewRumble';
import { StudentViewSection } from './StudentViewSection';

const StudentDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);
  const rumbleList = useRecoilValue(rumbles.list);

  return (
    <>
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
          render={() => (
            <RenderStudentDashboard
              sectionList={sectionList}
              rumbleList={rumbleList}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/student/section"
          component={StudentViewSection}
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
