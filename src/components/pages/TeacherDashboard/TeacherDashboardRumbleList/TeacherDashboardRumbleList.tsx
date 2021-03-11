import React from 'react';
import { useHistory } from 'react-router-dom';
import { Sections } from '../../../../api';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  sections,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  const { push } = useHistory();
  const openNewRumbleForm = () => {
    push('/dashboard/teacher/rumble/new');
  };
  return (
    <div className="rumble-list-wrapper">
      <h2>Rumbles</h2>
      <button onClick={openNewRumbleForm}>New Rumble</button>
      <div className="rumble-list">
        {sections?.map((sec) =>
          sec.rumbles.map((rum) => (
            <TeacherDashboardRumbleCard
              key={rum.id}
              section={sec}
              rumble={rum}
            />
          )),
        )}
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default TeacherDashboardRumbleList;
