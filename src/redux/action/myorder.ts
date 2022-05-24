import { SHOW_MY_ORDER,SHOW_PENDING_ORDER } from "../type";
import axios from "axios";
import { checkMyOrder, checkPendingOrder } from "../../components/API/order";

export const ShowMyOrder = () => async (dispatch: any) => {
  try {
    let res: any = await checkMyOrder();
    dispatch({
      type: SHOW_MY_ORDER,
      payload: res.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};

export const ShowPendingOrder = () => async (dispatch: any) => {
  try {
    let res: any = await checkPendingOrder();
    dispatch({
      type: SHOW_PENDING_ORDER,
      payload: res.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};