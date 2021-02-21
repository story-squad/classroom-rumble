import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export const authorizeWithClever = async (
  code: string,
): Promise<AxiosResponse<CleverAuthResponseType>> => {
  return axiosWithAuth().get(`/api/auth/o/clever?code=${code}`);
};

type CleverAuthResponseType =
  | {
      actionType: 'SUCCESS';
      userType: 'student' | 'teacher';
      body: IAuthResponse;
    }
  | {
      actionType: 'MERGE';
      userType: 'student' | 'teacher';
      body: IUser;
    }
  | {
      actionType: 'NEW';
      userType: 'student' | 'teacher';
      body: ICleverStudent | ICleverTeacher;
    };

interface IAuthResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

interface IUser {
  id: number;
  isValidated: boolean;
  codename: string;
  password: string;
  email: string;
  roleId: number;
  created_at: Date;
  updated_at: Date;
  firstname: string;
  lastname: string;
  parentEmail?: string;
  age?: number;
}

interface ICleverStudent {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  grade: CleverGradeType;
}

interface ICleverTeacher {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  sections: string[];
}

type CleverSubjectType =
  | 'english/language arts'
  | 'math'
  | 'science'
  | 'social studies'
  | 'language'
  | 'homeroom/advisory'
  | 'interventions/online learning'
  | 'technology and engineering'
  | 'PE and health'
  | 'arts and music'
  | 'other'
  | '';

type CleverGradeType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'PreKindergarten'
  | 'TransitionalKindergarten'
  | 'Kindergarten'
  | 'InfantToddler'
  | 'Preschool'
  | 'PostGraduate'
  | 'Ungraded'
  | 'Other'
  | '';
