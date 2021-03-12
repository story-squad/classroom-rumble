import React from 'react';
import { Rumbles } from '../../../../api';
import RenderRumbleList from './RenderStudentRumbleList';

const StudentRumbleListContainer = ({
  rumbleList,
}: IStudentRumbleListContainerProps): React.ReactElement => {
  return rumbleList ? (
    <RenderRumbleList rumbles={rumbleList} />
  ) : (
    <p>Loading Rumbles...</p>
  );
};

interface IStudentRumbleListContainerProps {
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default StudentRumbleListContainer;
