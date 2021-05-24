import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { query } from '../../../utils';
import RenderSignupPage from './RenderSignupPage';

const SignupPageContainer = (): React.ReactElement => {
  const { search } = useLocation();

  const [isNew, setIsNew] = useState(false);
  const [cleverId, setCleverId] = useState<string>();
  const [roleId, setRoleId] = useState<number>();
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    // Parse the querystring if it exists
    if (search?.includes('?')) {
      const params = query.parse<
        'isNew' | 'cleverId' | 'roleId' | 'firstname' | 'lastname' | 'email'
      >(search);
      setIsNew(params.isNew === 'true');
      setCleverId(params.cleverId);
      setRoleId(params.roleId ? parseInt(params.roleId, 10) : undefined);
      setFirstname(params.firstname);
      setLastname(params.lastname);
      setEmail(params.email);
    }
  }, []);

  return (
    <RenderSignupPage
      isNew={isNew}
      cleverId={cleverId}
      roleId={roleId}
      firstname={firstname}
      lastname={lastname}
      email={email}
    />
  );
};

export default SignupPageContainer;
