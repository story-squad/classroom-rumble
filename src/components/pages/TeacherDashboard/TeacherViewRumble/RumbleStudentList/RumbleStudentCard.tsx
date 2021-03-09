import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { current } from '../../../../../state';

const RumbleStudentCard = ({
  section,
  student,
}: IRumbleStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentStudent = useSetRecoilState(current.student);
  const setCurrentSub = useSetRecoilState(current.sub);

  const openSubmission = () => {
    setCurrentSection(section);
    setCurrentStudent(student);
    setCurrentSub(student.submissions[0]);
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: student.submissions[0],
    });
  };

  return (
    <div className="student-card">
      <h3>
        {student.firstname} {student.lastname}
      </h3>
      <p>{student.codename}</p>
      <p>{student.email}</p>
      <p>
        Submission Status:{' '}
        {student.submissions.length > 0 ? (
          <button onClick={openSubmission}>View</button>
        ) : (
          'No'
        )}
      </p>
    </div>
  );
};

interface IRumbleStudentCardProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentCard;
