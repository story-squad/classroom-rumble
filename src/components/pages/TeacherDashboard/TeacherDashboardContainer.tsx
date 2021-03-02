import React from 'react';
import { Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rumbles, sections } from '../../../state';
import RenderTeacherDashboard from './RenderTeacherDashboard';

const TeacherDashboardContainer = (): React.ReactElement => {
  const sectionList = useRecoilValue(sections.list);
  const rumbleList = useRecoilValue(rumbles.list);

  return (
    <>
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
    </>
  );
};

export default TeacherDashboardContainer;
