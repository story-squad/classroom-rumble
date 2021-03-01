import { axiosWithAuth } from '../axiosWithConfig';
import { ISectionEnumData, ISectionWithRumbles } from '../Sections';

export const getUserInfo = async (): Promise<{
  enumData: ISectionEnumData;
  sections: ISectionWithRumbles[];
}> => {
  const { data } = await axiosWithAuth().get('/api/rumble/');
  return data;
};
