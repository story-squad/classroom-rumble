import React, { useState } from 'react';

// Options Takes in two values whichever is put in first is the one to be rendered first
// RenderFirst takes the first component to render
// RenderSecond takes the second component to render
const Toggle = ({
  options,
  renderFirst: RenderFirst,
  renderSecond: RenderSecond,
}: ToggleProps) => {
  const [view, setView] = useState(false);
  const openOption1 = () => setView(true);
  const openOption2 = () => setView(false);

  return (
    <>
      <div className="section-content-switcher-wrapper">
        <div className="section-content-switcher-container">
          <h3 onClick={openOption1} className={view ? 'active' : ''}>
            {options[0]}
          </h3>
          <h3 onClick={openOption2} className={view ? '' : 'active'}>
            {options[1]}
          </h3>
        </div>
      </div>
      <RenderFirst visible={view} />
      <RenderSecond visible={!view} />
    </>
  );
};

interface ToggleProps {
  renderFirst: React.ComponentType<ComponentRenderProps>;
  renderSecond: React.ComponentType<ComponentRenderProps>;
  options: string[];
}

interface ComponentRenderProps {
  visible: boolean;
}

export default Toggle;
