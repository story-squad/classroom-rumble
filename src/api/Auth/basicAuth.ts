import { axiosWithoutAuth } from '../axiosWithConfig';
import {
  IAuthResponse,
  ILoginBody,
  ISignUpBody,
  SignupFormState,
} from './authTypes';

export const login = async (body: ILoginBody): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post('/api/auth/login', body);
  return data;
};

export const signup = async (
  credentials: ISignUpBody,
): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post(
    'api/auth/register',
    credentials,
  );
  return data;
};

export const formatSignupBody = (formData: SignupFormState): ISignUpBody => {
  const age = parseInt(formData.ageStr);
  return {
    email: formData.email,
    firstname: formData.firstname,
    lastname: formData.lastname,
    parentEmail: age < 13 ? formData.parentEmail : formData.email,
    password: formData.password,
    codename: formData.codename,
    age,
  };
};
