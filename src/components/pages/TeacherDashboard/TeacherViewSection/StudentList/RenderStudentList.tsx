import React from 'react';
import { Auth } from '../../../../../api';

const RenderStudentList = ({
  studentList,
}: IRenderStudentListProps): React.ReactElement => {
  return (
    <div className="student-list">
      <h2>Students</h2>
    </div>
  );
};

interface IRenderStudentListProps {
  studentList?: Auth.IUser[];
}

export default RenderStudentList;
