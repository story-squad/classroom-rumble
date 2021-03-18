import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { Loader } from '../../../common';
import RenderStudentViewSection from './RenderStudentViewSection';

const StudentViewSectionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const section = useRecoilValue(current.section);

  return section && !isLoading ? (
    <RenderStudentViewSection section={section} />
  ) : isLoading ? (
    <Loader message="Loading section" />
  ) : (
    <p>Redirecting...</p>
  );
};

export default StudentViewSectionContainer;
