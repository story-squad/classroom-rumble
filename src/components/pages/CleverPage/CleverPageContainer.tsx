import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Auth } from '../../../api';
import { token } from '../../../utils';

const CleverPageContainer = (): React.ReactElement => {
  const { search } = useLocation();
  const [code, setCode] = useState<undefined | string>();

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
              break;
            case 'NEW':
              // Open signup form and pass data.body into the form state
              break;
            case 'SUCCESS':
              // On success, store token and push to correct dashboard
              token.set(data.body.token);
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
