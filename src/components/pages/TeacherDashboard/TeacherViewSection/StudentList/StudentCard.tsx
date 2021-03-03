import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth, Sections } from '../../../../../api';

const StudentCard = ({
  section,
  student,
}: IStudentCardProps): React.ReactElement => {
  const { push } = useHistory();

  const openStudent = () => {
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

interface IStudentCardProps {
  student: Auth.IUser;
  section: Sections.ISection;
}

export default StudentCard;
