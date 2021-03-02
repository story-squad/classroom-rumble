import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rumbles, sections } from '../../../state';
import { JoinSectionRedirect } from './JoinSectionRedirect';
import RenderStudentDashboard from './RenderStudentDashboard';

const StudentDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);
  const rumbleList = useRecoilValue(rumbles.list);

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
        render={() => (
          <RenderStudentDashboard
            sectionList={sectionList}
            rumbleList={rumbleList}
          />
        )}
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
