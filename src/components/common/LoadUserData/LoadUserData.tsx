import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Auth, InitialState } from '../../../api';
import { app, auth, rumbles, sections } from '../../../state';

/**
 * This component runs the app state initialization. It gets certain enum
 * data from the server as well as a list of the currently logged-in users'
 * sections and rumbles.
 */
const LoadUserData = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const token = useRecoilValue(auth.authToken);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const rumbleIds = useRecoilValue(rumbles.ids);
  const sectionIds = useRecoilValue(sections.ids);

  const init = useRecoilCallback(
    ({ set }) => (res: InitialState.IAppInitResponse) => {
      console.log('running init', res);
      // Parse init data
      set(app.enum.grades, res.enumData.grades);
      set(app.enum.subjects, res.enumData.subjects);

      // Adding the sections
      // Parse out the section ids
      const newSectionIds = res.sections
        .map((s) => s.id)
        .filter((sid) => !sectionIds || !sectionIds.includes(sid));
      // Update the existing list of ids
      set(sections.ids, (prev) =>
        prev ? [...prev, ...newSectionIds] : newSectionIds,
      );
      // For every section,
      res.sections.forEach((sec) => {
        // Get a list of the rumble ids for that section
        const newRumbleIds = sec.rumbles
          .map((r) => r.id) // From array of rumbles => array of ids (numbers)
          .filter((rid) => !rumbleIds || !rumbleIds.includes(rid)); // Filter out the ones we're already tracking
        // Update the section
        set(sections.getById(sec.id), (prev) =>
          prev ? { ...prev, ...sec } : sec,
        );
        // Update the list of rumble ids for the current section
        set(rumbles.getBySectionId(sec.id), newRumbleIds);
        // Update the list of rumbleIds with the new ones
        set(rumbles.ids, (prev) => {
          return prev ? [...prev, ...newRumbleIds] : newRumbleIds;
        });
        sec.rumbles.forEach((rum) => {
          // Update each rumble
          set(rumbles.getById(rum.id), rum);
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (user && token) {
      InitialState.getUserInfo()
        .then((res) => {
          init(res);
          // Route to dashboard if they're not already on it
          if (!pathname.includes('dashboard')) {
            let userType = Auth.Roles[user.roleId];
            if (userType === 'user') userType = 'student';
            push(`/dashboard/${userType}`);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, token]);

  return <></>;
};

export default LoadUserData;
