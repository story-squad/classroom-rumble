import React from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/norumbles.svg';
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
              // Checks if there are any current rumbles if not renders an image
              <>
                <h3>Current Rumbles</h3>
                <StudentRumbleList rumbles={currentRumbles} />
              </>
            ) : (
              <div>
                <h3>Current Rumbles</h3>
                <img src={emptyMail} alt="You don't have any current rumbles" />
              </div>
            )}
            {pastRumbles.length ? (
              //Checks if there are any past rumbles if not renders an image
              <>
                <h3>Past Rumbles</h3>
                <StudentRumbleList rumbles={pastRumbles} />
              </>
            ) : (
              <div>
                <h3>Past Rumbles</h3>
                <p>You don&apos;t have any classes yet.</p>
                <img src={rocketBoy} alt="You don't have any classes" />
              </div>
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
