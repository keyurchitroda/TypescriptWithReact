import { LOGIN_SUCCESS, SHOW_ALL_USER } from "../type";
import { checkSignin, checkAllUser } from "../../components/API/auth";

export const Auth =
  (data: any, navigate: any, toast: any) => async (dispatch: any) => {
    try {
      console.log("data", data);

      let res: any = await checkSignin(data);

      console.log("data", res);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.response_data,
      });

      if (res.response_data.role == "admin") {
        console.log("admin");
        navigate("/showproduct");
      } else {
        navigate("/");
        toast.success(res.message);
      }
    } catch (err: any) {
      console.log("err-Login", err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

export const ShowAllUser = () => async (dispatch: any) => {
  try {
    let res: any = await checkAllUser();
    console.log("res", res);

    dispatch({
      type: SHOW_ALL_USER,
      payload: res.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};
