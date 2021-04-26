import React, { useEffect, useState } from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  sections,
  visible = true,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  const [rumbleLength, setRumbleLength] = useState<number>();

  useEffect(() => {
    // This gets the total amount of rumbles
    const sectionRumbles = sections.map((sec) => {
      return sec.rumbles.length;
    });

    const totalRumbles = sectionRumbles.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    setRumbleLength(totalRumbles);
  }, [sections]);

  if (!visible) return <></>;
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        {!sections || (sections && rumbleLength === 0) ? (
          // If there are no sections show that there is alsp no rubmles
          // Div is for centering purposes
          <div className="no-rumbles">
            <div className="message-text-container">
              <p>You don&apos;t have any classes yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current rumbles" />
          </div>
        ) : (
          <div className="rumble-list">
            {sections?.map((sec) =>
              // putting statment here renders it as many times as there are sections
              sec.rumbles.map((rum) => (
                <TeacherDashboardRumbleCard
                  key={rum.id}
                  section={sec}
                  rumble={rum}
                />
              )),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
  visible?: boolean;
}

export default TeacherDashboardRumbleList;
