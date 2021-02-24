import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { query } from '../../../utils';
import RenderLoginPage from './RenderLoginPage';

const LoginPageContainer = (): React.ReactElement => {
  const { search } = useLocation();

  const [isMerge, setIsMerge] = useState(false);
  const [codename, setCodename] = useState<string>();
  const [cleverId, setCleverId] = useState<string>();

  useEffect(() => {
    // Only parse the query if there is one
    if (search?.includes('?')) {
      const params = query.parse<'isMerge' | 'codename' | 'cleverId'>(search);
      setIsMerge(params.isMerge === 'true');
      setCodename(params.codename);
      setCleverId(params.cleverId);
    }
  }, [search]);

  return (
    <RenderLoginPage
      isMerge={isMerge}
      codename={codename}
      cleverId={cleverId}
    />
  );
};

export default LoginPageContainer;
