import { api } from "./api";
import { BASE_URL } from "./config";

export const checkNewOrder = (data: any) =>
  api.postMethod(`${BASE_URL}/order/new`, data);

export const checkMyOrder = () => api.getMethod(`${BASE_URL}/order/my`);

export const checkPendingOrder = () =>
  api.getMethod(`${BASE_URL}/order/pending`);

export const checkOrderStatus = (data: any) =>
  api.postMethod(`${BASE_URL}/order/orderstatus`, data);
