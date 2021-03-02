import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rumbles, sections } from '../../../state';
import RenderTeacherDashboard from './RenderTeacherDashboard';
import { TeacherViewSection } from './TeacherViewSection';
import { TeacherViewStudent } from './TeacherViewStudent';

const TeacherDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);
  const rumbleList = useRecoilValue(rumbles.list);

  return (
    <Switch>
      <Route
        exact
        path="/dashboard/teacher"
        render={() => (
          <RenderTeacherDashboard
            sectionList={sectionList}
            rumbleList={rumbleList}
          />
        )}
      />
      <Route
        path="/dashboard/teacher/section"
        render={(props) => <TeacherViewSection {...props} />}
      />
      <Route
        path="/dashboard/teacher/student"
        render={(props) => <TeacherViewStudent {...props} />}
      />
      {/* Fallback redirect for nonexistent routes */}
      <Route
        path="/dashboard/teacher"
        component={() => <Redirect to="/dashboard/teacher" />}
      />
    </Switch>
  );
};

export default TeacherDashboardContainer;
