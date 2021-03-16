import React from 'react';
import Dots from './Dots';

const Loader = ({ message = 'Loading' }: ILoaderProps): React.ReactElement => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <p>
          {message}
          <Dots />
        </p>
      </div>
    </div>
  );
};

interface ILoaderProps {
  message?: string;
}

export default Loader;
