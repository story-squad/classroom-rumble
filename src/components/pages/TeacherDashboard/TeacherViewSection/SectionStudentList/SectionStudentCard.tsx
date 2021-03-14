import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { current } from '../../../../../state';

const SectionStudentCard = ({
  section,
  student,
}: ISectionStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentStudent = useSetRecoilState(current.student);

  const openStudent = () => {
    setCurrentSection(section);
    setCurrentStudent(student);
    push('/dashboard/teacher/student', { student, section });
  };

  return (
    <div className="list-body-row" onClick={openStudent}>
      <div className="list-body-col">
        {student.firstname} {student.lastname}
      </div>
      <div className="list-body-col">{student.lastname}</div>
      <div className="list-body-col">{student.firstname}</div>
      <div className="list-body-col">{student.submissions.length}</div>
    </div>
  );
};

interface ISectionStudentCardProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISectionWithRumbles;
}

export default SectionStudentCard;
