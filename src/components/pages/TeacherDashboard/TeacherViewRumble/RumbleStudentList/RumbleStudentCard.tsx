import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth, Sections } from '../../../../../api';
import { current } from '../../../../../state';

const RumbleStudentCard = ({
  section,
  student,
}: IRumbleStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentStudent = useSetRecoilState(current.student);

  const openStudent = () => {
    setCurrentSection(section);
    setCurrentStudent(student);
    push('/dashboard/teacher/student', { student, section });
  };

  return (
    <div className="student-card" onClick={openStudent}>
      <h3>
        {student.firstname} {student.lastname}
      </h3>
      <p>{student.codename}</p>
      <p>{student.email}</p>
    </div>
  );
};

interface IRumbleStudentCardProps {
  student: Auth.IUser;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentCard;
