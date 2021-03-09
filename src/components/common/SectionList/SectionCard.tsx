import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../api';
import { Roles } from '../../../api/Auth';
import { auth, current } from '../../../state';

const TeacherSection = ({
  id,
  joinCode,
  ...section
}: Sections.ISectionWithRumbles): React.ReactElement => {
  const { push } = useHistory();
  const user = useRecoilValue(auth.user);
  const role = useMemo(() => {
    if (!user) return undefined;
    else return user.roleId === Roles.user ? 'student' : Roles[user.roleId];
  }, [user]);

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
      <p>
        Join Code:{' '}
        <span>
          http://localhost:3000/dashboard/student/join?joinCode={joinCode}
          &sectionId={id}
        </span>
      </p>
    </div>
  );
};

export default TeacherSection;
