import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { sections } from '../../../../state';
import { Loader } from '../../../common';
import RenderStudentViewRumbles from './RenderStudentViewSection';

const StudentViewSectionRumblesContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const sectionId = useRecoilValue(sections.selected);

  return sectionId && !isLoading ? (
    <RenderStudentViewRumbles sectionId={sectionId} />
  ) : isLoading ? (
    <Loader message={'Loading Rumbles'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default StudentViewSectionRumblesContainer;
