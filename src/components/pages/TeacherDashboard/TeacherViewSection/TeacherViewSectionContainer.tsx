import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current, enumData, modals } from '../../../../state';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section');
  const section = useRecoilValue(current.section);

  const gradeEnum = useRecoilValue(enumData.grades);
  const gradeValue = useMemo(() => {
    const x = gradeEnum?.filter((x) => x.value === section?.gradeId)[0];
    return x ? x.label : '';
  }, [gradeEnum, section, isLoading]);

  const subjectEnum = useRecoilValue(enumData.subjects);
  const subjectValue = useMemo(() => {
    const x = subjectEnum?.filter((x) => x.value === section?.subjectId)[0];
    return x ? x.label : '';
  }, [subjectEnum, section, isLoading]);

  const setInviteOpen = useSetRecoilState(modals.invite.isOpen);
  const openInviteModal = () => {
    setInviteOpen(true);
  };

  return section && !isLoading ? (
    <RenderTeacherViewSection
      section={section}
      openInviteModal={openInviteModal}
      grade={gradeValue}
      subject={subjectValue}
    />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewSectionContainer;
