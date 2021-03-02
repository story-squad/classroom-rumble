import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Sections } from '../../../api';
import { Roles } from '../../../api/Auth';
import { auth } from '../../../state';

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

  const openSection = () => {
    push(`/dashboard/${role}/section`, { ...section, id, joinCode });
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
