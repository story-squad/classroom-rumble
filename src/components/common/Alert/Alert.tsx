import React, { useEffect, useState } from 'react';
import { useKeyPress } from '../../../hooks';

export const Component = ({
  component: Component,
  closable = true,
  centered = false,
  visible,
  setVisible,
  className,
}: AlertProps): React.ReactElement => {
  const [showContents, setShowContents] = useState(visible);

  console.log({ visible });
  console.log({ closable });

  const closeAlert = () => {
    setVisible(false);
  };

  useKeyPress({ key: 'Escape' || 'Esc', action: () => closeAlert() });

  useEffect(() => {
    if (!visible) setTimeout(() => setShowContents(false), 500);
    else setShowContents(true);
  }, [visible]);

  return (
    <div
      className={`alert-wrapper${visible ? '' : ' hidden'}${
        centered ? ' centered' : ''
      }`}
      onClick={closable ? () => setVisible(false) : () => null}
    >
      <div
        className={`alert${className ? ' ' + className : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closable && <div className="close-button" onClick={closeAlert}></div>}

        <div className="alert-content">
          {showContents && <Component closeAlert={closeAlert} />}
        </div>
      </div>
    </div>
  );
};

interface AlertProps {
  component: React.ComponentType<AlertComponentProps>;
  closable?: boolean;
  centered?: boolean;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
  className?: string;
}

export interface AlertComponentProps {
  closeAlert: () => void;
}
