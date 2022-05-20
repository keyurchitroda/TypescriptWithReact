import { api } from './api';
import { BASE_URL } from './config';

export const checkSignup = (data:any) =>
  api.postMethod(`${BASE_URL}/auth/signup`, data,{});

export const checkSignin = (data:any) =>
  api.postMethod(`${BASE_URL}/auth/signin`, data,{});