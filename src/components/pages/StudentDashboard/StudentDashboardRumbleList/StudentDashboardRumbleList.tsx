import React from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import StudentDashboardRumbleCard from './StudentDashboardRumbleCard';

const StudentDashboardRumbleList = ({
  sections,
}: IStudentDashboardRumbleListProps): React.ReactElement => {
  // const [currentRumbles] = useRumbleFilter(
  //   sections.reduce<Rumbles.IRumbleWithSectionInfo[]>(
  //     (acc, section) => [...acc, ...section.rumbles],
  //     [],
  //   ),
  // );

  return (
    <div className="student-dash-rumble-list-wrapper">
      <div className="student-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        {!sections || sections.length === 0 ? (
          // If there are no sections show that there is alsp no rubmles
          // Div is for centering purposes
          <div className="no-rumbles">
            <div className="message-text-container">
              <p>You don&apos;t have any rumbles yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current rumbles" />
          </div>
        ) : (
          <div className="rumble-list">
            {sections?.map((sec) =>
              sec.rumbles
                .filter((rumble) => {
                  return rumble.phase !== `COMPLETE`;
                })
                .map((rum) => (
                  <StudentDashboardRumbleCard
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

interface IStudentDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default StudentDashboardRumbleList;
