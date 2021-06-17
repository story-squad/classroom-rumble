import React from 'react';
import { useRecoilValue } from 'recoil';
import { useResetOnUnmount } from '../../../../hooks';
import { sections } from '../../../../state';
import { Loader } from '../../../common';
import RenderStudentViewRumbles from './RenderStudentViewSection';

const StudentViewSectionRumblesContainer = (): React.ReactElement => {
  const sectionId = useRecoilValue(sections.selected);
  useResetOnUnmount({ recoil: [sections.selected] });

  return sectionId ? (
    <RenderStudentViewRumbles sectionId={sectionId} />
  ) : (
    <Loader message={'Loading rumbles'} />
  );
};

export default StudentViewSectionRumblesContainer;
