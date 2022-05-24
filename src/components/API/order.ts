import { api } from "./api";
import { BASE_URL } from "./config";

export const checkNewOrder = (data: any) =>
  api.postMethod(`${BASE_URL}/order/new`, data);
