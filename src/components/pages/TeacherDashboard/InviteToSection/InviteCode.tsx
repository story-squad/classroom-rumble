import React from 'react';
import { Sections } from '../../../../api';
import { helpers } from '../../../../utils';

const InviteCode = ({
  section,
  goBack,
  disableSectionPicker,
}: IInviteCodeProps): React.ReactElement => (
  <div className="invite-code">
    <div className="content">
      <h3>{section.name}</h3>
      <textarea rows={6} readOnly value={helpers.joinCode(section)} />
    </div>
    {!disableSectionPicker && (
      <div className="footer">
        <button onClick={goBack}>Pick a Different Class</button>
      </div>
    )}
  </div>
);

interface IInviteCodeProps {
  section: Sections.ISectionWithRumbles;
  goBack: () => void;
  disableSectionPicker: boolean;
}

export default InviteCode;
