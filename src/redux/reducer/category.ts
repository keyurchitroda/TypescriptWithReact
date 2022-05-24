import { SHOW_ALL_CATEGORY } from "../type";

const initialState = {
  category: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_ALL_CATEGORY:
      return {
        ...state,
        category: payload,
      };

    default:
      return state;
  }
};

export default reducer;
