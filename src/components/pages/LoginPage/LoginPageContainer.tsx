import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { query } from '../../../utils';
import { Loader } from '../../common';
import RenderLoginPage from './RenderLoginPage';

const LoginPageContainer = (): React.ReactElement => {
  const { search } = useLocation();

  const [isMerge, setIsMerge] = useState(false);
  const [codename, setCodename] = useState<string>();
  const [cleverId, setCleverId] = useState<string>();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only parse the query if there is one
    if (search?.includes('?')) {
      const params = query.parse<'isMerge' | 'codename' | 'cleverId'>(search);
      setIsMerge(params.isMerge === 'true');
      setCodename(params.codename);
      setCleverId(params.cleverId);
    }
    setLoaded(true);
  }, [search]);

  return loaded ? (
    <RenderLoginPage
      isMerge={isMerge}
      codename={codename}
      cleverId={cleverId}
    />
  ) : (
    <Loader />
  );
};

export default LoginPageContainer;
