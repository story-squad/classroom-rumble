import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Auth } from '../../../api';
import { token } from '../../../utils';

/**
 * The Clever redirect page, gets a token from Clever and sends it to
 * the backend, which trades it with the Clever API for user info.
 *
 * After the OAuth process, the backend returns the user's registration
 * state as pertains to our database and this component routes the user
 * to where they need to go.
 */
const CleverPageContainer = (): React.ReactElement => {
  const { search } = useLocation();
  const [code, setCode] = useState<undefined | string>();
  const { push } = useHistory();

  useEffect(() => {
    if (!code) {
      const params = JSON.parse(
        '{"' + search.slice(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => (key === '' ? value : decodeURIComponent(value)),
      );
      setCode(params.code);
    }
  }, []);

  useEffect(() => {
    if (code) {
      Auth.authorizeWithClever(code)
        .then(({ data }) => {
          console.log(data);
          switch (data.actionType) {
            case 'MERGE':
              // Something needs to happen on the backend here I think
              // Is this your account?
              break;
            case 'NEW':
              // Open signup form and pass data.body into the form state
              // Do you have an existing SS account?
              // If yes -> try to sign in & we'll merge it
              // Else -> create new account and merge it with clever stuff
              break;
            case 'SUCCESS':
              // On success, store token and push to correct dashboard
              token.set(data.body.token);
              push(`/${data.userType}/dashboard`);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code]);

  return <></>;
};

export default CleverPageContainer;
