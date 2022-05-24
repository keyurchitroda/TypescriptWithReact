import { SHOW_MY_ORDER, SHOW_PENDING_ORDER } from "../type";

const initialState = {
  myorders: [],
  pendingorders: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  console.log(payload, "payload");

  switch (type) {
    case SHOW_MY_ORDER:
      localStorage.setItem("myorder", JSON.stringify(payload));
      return {
        ...state,
        myorders: payload,
      };
    case SHOW_PENDING_ORDER:
      return {
        ...state,
        myorders: payload,
      };
    default:
      return state;
  }
};

export default reducer;
