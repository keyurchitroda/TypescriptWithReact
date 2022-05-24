import { SHOW_ALL_PRODUCT_SUCCESS } from "../type";
import axios from "axios";
import { checkShowAllProduct } from "../../components/API/product";

export const ShowAllProduct = () => async (dispatch: any) => {
  try {
    let res: any = await checkShowAllProduct();
    dispatch({
      type: SHOW_ALL_PRODUCT_SUCCESS,
      payload: res.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};
