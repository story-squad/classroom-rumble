import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = (
  body: ILoginBody,
): Promise<AxiosResponse<{ token: string }>> => {
  return axiosWithoutAuth().post('/api/auth/login', body);
};

export interface ILoginBody {
  codename: string;
  password: string;
}
