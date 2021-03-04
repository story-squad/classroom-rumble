import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const section = useRecoilValue(current.section);

  return section ? (
    <RenderTeacherViewSection {...section} />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewSectionContainer;
