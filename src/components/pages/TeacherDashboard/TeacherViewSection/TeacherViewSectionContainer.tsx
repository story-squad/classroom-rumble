import React from 'react';
import { Redirect } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { sections } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const sectionId = useRecoilValue(sections.selected);

  return sectionId && !isLoading ? (
    <RenderTeacherViewSection sectionId={sectionId} />
  ) : isLoading ? (
    <Loader message="Loading section" />
  ) : (
    <Redirect to="/dashboard/teacher" />
  );
};

export default TeacherViewSectionContainer;
