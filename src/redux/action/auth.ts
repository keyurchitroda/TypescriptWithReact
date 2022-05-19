import { LOGIN_SUCCESS } from "../type";
import axios from "axios";

export const Auth =
  (data: any, navigate: any, toast: any) => async (dispatch: any) => {
    try {
      console.log("data", data);

      let res = await axios.post(
        "http://localhost:3002/v1/api/auth/signin",
        data
      );

      console.log("data", res);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.response_data,
      });

      if (res.data.response_data.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err: any) {
      console.log("err-Login", err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
