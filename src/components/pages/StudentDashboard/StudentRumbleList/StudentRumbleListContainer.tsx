import React from 'react';
import { Rumbles } from '../../../../api';
import { Loader } from '../../../common';
import RenderRumbleList from './RenderStudentRumbleList';

const StudentRumbleListContainer = ({
  rumbleList,
}: IStudentRumbleListContainerProps): React.ReactElement => {
  return rumbleList ? (
    <RenderRumbleList rumbles={rumbleList} />
  ) : (
    <Loader message={'Loading rumbles'} />
  );
};

interface IStudentRumbleListContainerProps {
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default StudentRumbleListContainer;
