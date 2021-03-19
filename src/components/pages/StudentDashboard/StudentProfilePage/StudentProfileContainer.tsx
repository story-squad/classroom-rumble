import React from 'react';
import { Redirect } from 'react-router';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../../state';
import RenderStudentProfile from './RenderStudnetProfile';

const StudentProfileContainer = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);

  return (
    <div className="profile-container">
      {user ? (
        <RenderStudentProfile user={user} />
      ) : (
        //   May be unnecessary
        <Redirect to="/dashboard/stduent" />
      )}
    </div>
  );
};

export default StudentProfileContainer;
