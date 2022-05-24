import { LOGIN_SUCCESS, SHOW_ALL_USER } from "../type";

const initialState = {
  isAuthenticated: false,
  users: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
      };

    case SHOW_ALL_USER:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};

export default reducer;
