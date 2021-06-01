import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { enumData, sections } from '../../../../state';

const TeacherDashboardSectionCard = ({
  sectionId,
}: {
  sectionId: number;
}): React.ReactElement => {
  const section = useRecoilValue(sections.getById(sectionId));
  const { push } = useHistory();

  const gradeEnum = useRecoilValue(enumData.grades);
  const subjectEnum = useRecoilValue(enumData.subjects);
  const setCurrentSection = useSetRecoilState(sections.selected);

  const openSection = () => {
    setCurrentSection(sectionId);
    push('/dashboard/teacher/section', { section });
  };

  return (
    <div className="section-card" onClick={openSection}>
      <div className="content">
        <h3>Class Name</h3>
        <h4>{section?.name}</h4>
      </div>
      <div className="content">
        <h3>Subject</h3>
        <h4>
          {subjectEnum?.filter((x) => x.value === section?.subjectId)[0].label}
        </h4>
      </div>
      <div className="content">
        <h3>Grade</h3>
        <h4>
          {gradeEnum?.filter((x) => x.value === section?.gradeId)[0].label}
        </h4>
      </div>
    </div>
  );
};

export default TeacherDashboardSectionCard;
