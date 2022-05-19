import { SHOW_ALL_PRODUCT_SUCCESS } from "../type";
import axios from "axios";

export const ShowAllProduct = () => async (dispatch: any) => {
  try {
    let header: any = {
      x_auth_token: localStorage.getItem("token"),
    };

    let res = await axios.get("http://localhost:3002/v1/api/product/all", {
      headers: header,
    });

    dispatch({
      type: SHOW_ALL_PRODUCT_SUCCESS,
      payload: res.data.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};
