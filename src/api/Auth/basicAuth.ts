import { axiosWithAuth, axiosWithoutAuth } from '../axiosWithConfig';
import {
  IAuthResponse,
  ILoginBody,
  INewEmailBody,
  ISignUpBody,
  NewEmailFormState,
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

export const resendEmail = async (): Promise<void> => {
  await axiosWithAuth().put('api/auth/activation');
};

export const sendEmail = async (data: INewEmailBody): Promise<void> => {
  await axiosWithAuth().post('api/auth/activation', data);
};

export const formatSendEmailBody = (data: NewEmailFormState): INewEmailBody => {
  const age = parseInt(data.ageStr);
  return {
    age,
    newEmail: data.newEmail,
  };
};
