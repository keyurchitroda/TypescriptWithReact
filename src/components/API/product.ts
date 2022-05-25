import { api } from "./api";
import { BASE_URL } from "./config";

export const checkAddProduct = (data: any) =>
  api.postMethod(`${BASE_URL}/product/add`, data);

export const checkShowAllProduct = () =>
  api.getMethod(`${BASE_URL}/product/all`);

export const checkSearchProduct = (data: any) =>
  api.getMethod(`${BASE_URL}/product/search?search=${data}`);

export const checkSearchProductByCategory = (data: any) =>
  api.getMethod(`${BASE_URL}/product/categorybysearch?cat_id=${data}`);
