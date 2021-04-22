import React from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Sections } from '../../../../api';
import { helpers } from '../../../../utils';

const InviteCode = ({
  section,
  goBack,
  disableSectionPicker,
}: IInviteCodeProps): React.ReactElement => {
  const clipboard = useClipboard({ copiedTimeout: 750 });
  return (
    <div className="invite-code">
      <div className="content">
        <h3>{section.name}</h3>
        <textarea
          rows={6}
          readOnly
          value={clipboard.copied ? 'Copied!' : helpers.joinCode(section)}
          ref={clipboard.target}
          onClick={clipboard.copy}
        />
      </div>
      {!disableSectionPicker && (
        <div className="footer">
          <button onClick={clipboard.copy}>Click To Copy</button>
          <button onClick={goBack}>Pick a Different Class</button>
        </div>
      )}
    </div>
  );
};

interface IInviteCodeProps {
  section: Sections.ISectionWithRumbles;
  goBack: () => void;
  disableSectionPicker: boolean;
}

export default InviteCode;
