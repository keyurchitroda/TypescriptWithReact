import { api } from "./api";
import { BASE_URL } from "./config";

export const checkAllCategory = () => api.getMethod(`${BASE_URL}/category/all`);
