import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rumbles, sections } from '../../../state';
import { CreateNewRumble } from './CreateNewRumble';
import RenderTeacherDashboard from './RenderTeacherDashboard';
import { TeacherViewSection } from './TeacherViewSection';
import { TeacherViewStudent } from './TeacherViewStudent';

const TeacherDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);
  const rumbleList = useRecoilValue(rumbles.list);

  return (
    <div className="teacher-dashboard-wrapper">
      <h1>Dashboard</h1>
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
        <Route
          path="/dashboard/teacher/rumble/new"
          render={(props) => <CreateNewRumble {...props} />}
        />
        {/* Fallback redirect for nonexistent routes */}
        <Route
          path="/dashboard/teacher"
          component={() => <Redirect to="/dashboard/teacher" />}
        />
      </Switch>
    </div>
  );
};

export default TeacherDashboardContainer;
