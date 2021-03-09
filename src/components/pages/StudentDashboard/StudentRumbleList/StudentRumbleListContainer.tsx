import React from 'react';
import { Rumbles } from '../../../../api';
import RenderRumbleList from './RenderStudentRumbleList';

interface IStudentRumbleList {
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

const StudentRumbleListContainer = ({
  rumbleList,
}: IStudentRumbleList): React.ReactElement => {
  return rumbleList ? (
    <RenderRumbleList rumbles={rumbleList} />
  ) : (
    <p>Loading Rumbles...</p>
  );
};

export default StudentRumbleListContainer;
