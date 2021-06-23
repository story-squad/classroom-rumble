import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { Roles } from '../../../api/Auth';
import { auth } from '../../../state';
import { query, token } from '../../../utils';

/**
 * The Clever redirect page, gets a token from Clever and sends it to
 * the backend, which trades it with the Clever API for user info.
 *
 * After the OAuth process, the backend returns the user's registration
 * state as pertains to our database and this component routes the user
 * to where they need to go.
 */
const CleverRedirectContainer = (): React.ReactElement => {
  const { search } = useLocation();
  const [code, setCode] = useState<undefined | string>();
  const { push } = useHistory();
  const setUser = useSetRecoilState(auth.user);
  const setToken = useSetRecoilState(auth.authToken);

  useEffect(() => {
    token.clear();
    if (!code) {
      const params = query.parse<'code'>(search);
      setCode(params.code);
    }
  }, []);

  useEffect(() => {
    if (code) {
      Auth.authorizeWithClever(code)
        .then((res) => {
          let params: URLSearchParams;
          const userType =
            res.roleId === Roles.user ? 'student' : Roles[res.roleId];
          switch (res.actionType) {
            case 'SUCCESS':
              // On success, store token and push to correct dashboard
              setUser(res.body.user);
              setToken(res.body.token);
              push(`/dashboard/${userType}`);
              break;
            case 'MERGE':
              // If the user has an account that can be merged, route to login
              params = new URLSearchParams({
                isMerge: 'true',
                cleverId: '6001e942790e5a0fd643d7eb',
                codename: res.body.codename,
              });
              push(`/login?${params.toString()}`);
              break;
            case 'NEW':
              // If the user doesn't have account, sign up and link account
              params = new URLSearchParams({
                isNew: 'true',
                cleverId: res.body.id,
                roleId: `${res.roleId}`,
                firstname: res.body.name.first,
                lastname: res.body.name.last,
              });
              if (res.body.email) params.set('email', res.body.email);
              push(`/signup?${params.toString()}`);
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

export default CleverRedirectContainer;
