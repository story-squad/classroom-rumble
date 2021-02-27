import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import { auth, sections } from '../../../../state';
import { query } from '../../../../utils';

const JoinSectionRedirectContainer = (): React.ReactElement => {
  const [sectionId, setSectionId] = useState<number>();
  const [joinCode, setJoinCode] = useState<string>();
  const setSectionList = useSetRecoilState(sections.list);
  const user = useRecoilValue(auth.user);
  const { search } = useLocation();

  useEffect(() => {
    if (!joinCode) {
      const params = query.parse<'joinCode' | 'sectionId'>(search);
      setJoinCode(params.joinCode);
      setSectionId(parseInt(params.sectionId ?? '', 10));
    }
  }, [search]);

  useEffect(() => {
    if (joinCode && sectionId && user) {
      Sections.joinSection({ joinCode }, sectionId, user.id)
        .then((res) => {
          setSectionList((prev) => (prev ? [...prev, res] : [res]));
        })
        .catch((err) => console.log(err));
    }
  }, [joinCode, sectionId, user]);

  return <></>;
};

export default JoinSectionRedirectContainer;
