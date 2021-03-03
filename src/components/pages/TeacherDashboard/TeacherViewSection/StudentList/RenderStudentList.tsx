import React from 'react';
import { Auth } from '../../../../../api';
import StudentCard from './StudentCard';

const RenderStudentList = ({
  studentList,
}: IRenderStudentListProps): React.ReactElement => {
  return (
    <div className="student-list-wrapper">
      <h2>Students</h2>
      <div className="student-list">
        {studentList.map((student) => (
          <StudentCard {...student} key={student.id} />
        ))}
      </div>
    </div>
  );
};

interface IRenderStudentListProps {
  studentList: Auth.IUser[];
}

export default RenderStudentList;
