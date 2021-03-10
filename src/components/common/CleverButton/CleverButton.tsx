import React from 'react';
import cleverLogo from '../../../assets/img/clever-square-icon.png';

/** Defaults to Login, pass the `signup` attribute to change text */
const CleverButton = ({
  signup = false,
}: {
  signup?: boolean;
}): React.ReactElement => {
  const openClever = () => null;
  return (
    <button className="clever-button">
      <img src={cleverLogo} alt="Clever Company Logo" />
      <p>{signup ? 'Sign Up' : 'Log In'} with Clever</p>
    </button>
  );
};

export default CleverButton;
