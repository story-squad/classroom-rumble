import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { enumData, modals, sections } from '../../../state';
import RenderSectionInfo from './RenderSectionInfo';

const SectionInfoContainer = ({
  sectionId,
  isTeacher = false,
  studentName,
}: {
  sectionId: number;
  isTeacher?: boolean;
  studentName?: string;
}): React.ReactElement => {
  const section = useRecoilValue(sections.getById(sectionId));

  const gradeEnum = useRecoilValue(enumData.grades);
  const gradeValue = useMemo(() => {
    const x = gradeEnum?.filter((x) => x.value === section?.gradeId)[0];
    return x ? x.label : '';
  }, [gradeEnum, section]);

  const subjectEnum = useRecoilValue(enumData.subjects);
  const subjectValue = useMemo(() => {
    const x = subjectEnum?.filter((x) => x.value === section?.subjectId)[0];
    return x ? x.label : '';
  }, [subjectEnum, section]);

  const setInviteOpen = useSetRecoilState(modals.inviteModalIsOpen);
  const openInviteModal = () => {
    setInviteOpen(true);
  };

  return section ? (
    <RenderSectionInfo
      isTeacher={isTeacher}
      section={section}
      openInviteModal={openInviteModal}
      grade={gradeValue}
      subject={subjectValue}
      studentName={studentName}
    />
  ) : (
    <p>Section not found.</p>
  );
};

export default SectionInfoContainer;
