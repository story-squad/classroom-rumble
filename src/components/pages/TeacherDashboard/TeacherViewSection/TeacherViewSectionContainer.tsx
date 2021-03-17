import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const section = useRecoilValue(current.section);

  return section && !isLoading ? (
    <RenderTeacherViewSection section={section} />
  ) : isLoading ? (
    <Loader message={'Loading section'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewSectionContainer;
