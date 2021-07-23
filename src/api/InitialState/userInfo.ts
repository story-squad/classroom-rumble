import { axiosWithAuth } from '../axiosWithConfig';
import { ISectionEnumData, ISectionWithRumbles } from '../Sections';

export const getUserInfo = async (): Promise<IAppInitResponse> => {
  const { data } = await axiosWithAuth().get('/api/rumble');
  return data;
};

export interface IAppInitResponse {
  enumData: ISectionEnumData;
  sections: ISectionWithRumbles[];
}
