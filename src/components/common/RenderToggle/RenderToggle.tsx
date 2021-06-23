import React, { useMemo, useState } from 'react';
import { Toggle } from '../Toggle';

// Options Takes in two values whichever is put in first is the one to be rendered first
// RenderFirst takes the first component to render
// RenderSecond takes the second component to render
const RenderToggle = ({
  options,
  renderFirst: RenderFirst,
  renderSecond: RenderSecond,
}: ToggleProps): React.ReactElement => {
  const [view, setView] = useState(false);

  const createToggle = (viewState: boolean) => () => {
    setView((prev) => (prev === viewState ? prev : !prev));
  };

  const newOptions = useMemo(() => {
    return options.map((opt, i) => ({
      text: opt.text,
      onSelect: createToggle(i !== 0),
    }));
  }, []);

  const toggle = () => {
    setView((prev) => !prev);
  };

  return (
    <>
      <Toggle view={view} options={newOptions} toggle={toggle} />
      <RenderFirst visible={!view} />
      <RenderSecond visible={view} />
    </>
  );
};

interface ToggleProps {
  renderFirst: React.ComponentType<ComponentRenderProps>;
  renderSecond: React.ComponentType<ComponentRenderProps>;
  options: IToggleOption[];
}

export interface IToggleOption {
  text: string;
  onSelect?: () => void;
}

interface ComponentRenderProps {
  visible: boolean;
}

export default RenderToggle;
