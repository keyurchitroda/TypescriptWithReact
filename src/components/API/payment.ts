import { api } from "./api";
import { BASE_URL } from "./config";

export const checkPayment = (data: any) =>
  api.postMethod(`${BASE_URL}/payment/checkout_payment`, data);
