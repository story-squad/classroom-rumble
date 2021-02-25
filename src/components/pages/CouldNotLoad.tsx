import React from 'react';

const CouldNotLoad = ({
  error,
  className,
}: CouldNotLoadProps): React.ReactElement => {
  return (
    <div className={`could-not-load${className ? ' ' + className : ''}`}>
      <div className="message">{error}&#128557;</div>
      <p>You are not in a section!</p>
    </div>
  );
};

interface CouldNotLoadProps {
  error: string;
  className?: string;
}

export default CouldNotLoad;
