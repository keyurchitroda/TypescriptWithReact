import { SHOW_ALL_CATEGORY} from "../type";
import { checkAllCategory } from "../../components/API/category";

export const ShowCategory = () => async (dispatch: any) => {
  try {
    let res: any = await checkAllCategory();
    dispatch({
      type: SHOW_ALL_CATEGORY,
      payload: res.response_data,
    });
  } catch (err: any) {
    console.log("err-Login", err.response.data.message);
    // toast.error(err.response.data.message);
  }
};