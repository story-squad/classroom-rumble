import React from 'react';
import { IToggleOption } from '../RenderToggle/RenderToggle';

const Toggle = ({ options, view, toggle }: ToggleProps): React.ReactElement => {
  return (
    <div className="toggle-wrapper">
      <div className="toggle-container">
        <div className="toggle-content">
          <h3
            onClick={options[0]?.onSelect ?? toggle}
            className={view ? '' : 'active'}
          >
            {options[0].text}
          </h3>
          <h3
            onClick={options[1]?.onSelect ?? toggle}
            className={view ? 'active' : ''}
          >
            {options[1].text}
          </h3>
        </div>
      </div>
    </div>
  );
};

interface ToggleProps {
  view: boolean;
  options: IToggleOption[];
  toggle: () => void;
}

export default Toggle;
