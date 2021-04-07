import React from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import rocketBoy from '../../../../assets/img/rocket_boy.svg';
import { useRumbleFilter } from '../../../../hooks';
import { SectionInfo } from '../../../common';
import { StudentRumbleList } from '../StudentRumbleList';

const RenderStudentViewSectionRumbles = ({
  section,
}: IRenderStudentViewSectionRumblesProps): React.ReactElement => {
  const [currentRumbles, pastRumbles] = useRumbleFilter(section.rumbles);
  return (
    <>
      <SectionInfo section={section} />
      <div className="student-view-section">
        <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            {currentRumbles.length ? (
              <>
                <h3>Current Rumbles</h3>
                <div className="section-content">
                  <StudentRumbleList rumbles={currentRumbles} />
                </div>
                <h3>Past Rumbles</h3>
                <div className="section-content">
                  <StudentRumbleList rumbles={pastRumbles} />
                </div>
              </>
            ) : (
              <>
                <h3>Current Rumbles</h3>
                <div>
                  <p>You don&apos;t have any current rumbles.</p>
                  <img
                    src={emptyMail}
                    alt="You don't have any current rumbles"
                  />
                </div>
                <h3>Past Rumbles</h3>
                <div>
                  <p>You don&apos;t have any classes yet.</p>
                  <img src={rocketBoy} alt="You don't have any classes" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface IRenderStudentViewSectionRumblesProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewSectionRumbles;
