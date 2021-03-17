import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { Loader } from '../../../common';
import RenderStudentViewRumbles from './RenderStudentViewSectionRumbles';

const StudentViewSectionRumblesContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const section = useRecoilValue(current.section);

  return section && !isLoading ? (
    <RenderStudentViewRumbles section={section} />
  ) : isLoading ? (
    <Loader message={'Loading Rumbles'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default StudentViewSectionRumblesContainer;
