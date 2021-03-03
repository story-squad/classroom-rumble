import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Sections } from '../../../../api';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = ({
  history,
}: RouteComponentProps): React.ReactElement => {
  const section = useMemo(
    () => history.location.state as Sections.ISectionWithRumbles,
    [history],
  );
  return <RenderTeacherViewSection {...section} />;
};

export default TeacherViewSectionContainer;
