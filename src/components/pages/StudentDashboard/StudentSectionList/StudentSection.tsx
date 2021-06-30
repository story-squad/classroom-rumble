import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { app, sections } from '../../../../state';
import { Loader } from '../../../common';

const StudentSection = ({
  sectionId,
}: {
  sectionId: number;
}): React.ReactElement => {
  const { push } = useHistory();

  const section = useRecoilValue(sections.getById(sectionId));
  const setSelectedSection = useSetRecoilState(sections.selected);
  const gradeEnum = useRecoilValue(app.enum.grades);
  const subjectEnum = useRecoilValue(app.enum.subjects);

  const openSection = () => {
    setSelectedSection(sectionId);
    push('/dashboard/student/section');
  };

  if (!section) return <Loader message="Loading section..." />;

  return (
    <div className="section-card" onClick={openSection}>
      <div className="content">
        <h3>Class Name</h3>
        <h4>{section.name}</h4>
      </div>
      <div className="content">
        <h3>Subject</h3>
        <h4>
          {subjectEnum?.filter((x) => x.value === section.subjectId)[0].label}
        </h4>
      </div>
      <div className="student-button-container">
        <div className="content">
          <h3>Grade</h3>
          <h4>
            {gradeEnum?.filter((x) => x.value === section.gradeId)[0].label}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default StudentSection;
