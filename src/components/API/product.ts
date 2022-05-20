
import { api } from './api';
import { BASE_URL } from './config';

export const checkAddProduct = (data:any) =>
  api.postMethod(`${BASE_URL}/product/add`, data);

export const checkShowAllProduct = () =>
  api.getMethod(`${BASE_URL}/product/all`);