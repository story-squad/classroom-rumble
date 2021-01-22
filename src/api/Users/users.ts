import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export const resetUsername = (
  body: UpdateUsernameBody,
): Promise<AxiosResponse<ResetReponse>> => {
  return axiosWithAuth().post('/email/resetusername', body);
};

export const resetPassword = (
  body: UpdatePasswordBody,
): Promise<AxiosResponse<ResetReponse>> => {
  return axiosWithAuth().post('/email/resetpassword', body);
};

export interface ResetReponse {
  message: string;
}

// Edit Profile interface for update password
export interface UpdatePasswordBody {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

// Edit Profile interface for update username
export interface UpdateUsernameBody {
  currentusername: string;
  newusername: string;
  confirmusername: string;
}
