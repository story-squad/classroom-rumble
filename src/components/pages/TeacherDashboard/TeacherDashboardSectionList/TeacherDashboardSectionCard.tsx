import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Auth, Sections } from '../../../../api';
import { auth, current, enumData } from '../../../../state';

const TeacherDashboardSectionCard = ({
  id,
  joinCode,
  ...section
}: Sections.ISectionWithRumbles): React.ReactElement => {
  const { push } = useHistory();
  const user = useRecoilValue(auth.user);
  const role = useMemo(
    () => (user?.roleId === Auth.Roles.user ? 'student' : 'teacher'),
    [user],
  );

  const gradeEnum = useRecoilValue(enumData.grades);
  const subjectEnum = useRecoilValue(enumData.subjects);
  const setCurrentSection = useSetRecoilState(current.section);

  const openSection = () => {
    const currentSection = { ...section, id, joinCode };
    setCurrentSection(currentSection);
    push(`/dashboard/${role}/section`, {
      section: currentSection,
    });
  };

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
      <div className="content">
        <h3>Grade</h3>
        <h4>
          {gradeEnum?.filter((x) => x.value === section.gradeId)[0].label}
        </h4>
      </div>
    </div>
  );
};

export default TeacherDashboardSectionCard;