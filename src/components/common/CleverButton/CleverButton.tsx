import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Auth } from '../../../api';
import cleverLogo from '../../../assets/img/clever_square_icon.png';
import { auth } from '../../../state';

/** Defaults to Login, pass the `signup` attribute to change text */
const CleverButton = ({
  signup = false,
}: {
  signup?: boolean;
}): React.ReactElement => {
  const [loading, setIsLoading] = useRecoilState(
    auth.loadingCleverLoginButtonURL,
  );
  const [url, setUrl] = useRecoilState(auth.cleverLoginButtonURL);

  useEffect(() => {
    if (!loading && !url) {
      Auth.cleverButton()
        .then((res) => {
          setUrl(res.url);
          setIsLoading(false);
        })
        .catch((err) => console.log({ err }));
    }
  }, [loading]);

  const openClever = () => {
    if (url) window.location.assign(url);
  };

  return (
    <button
      className="clever-button"
      onClick={openClever}
      disabled={loading || !url}
    >
      {loading || !url ? (
        <p>Loading Clever Sign On</p>
      ) : (
        <>
          <img src={cleverLogo} alt="Clever Company Logo" />
          <p>{signup ? 'Sign Up' : 'Log In'} with Clever</p>
        </>
      )}
    </button>
  );
};

export default CleverButton;
