import { SHOW_ALL_PRODUCT_SUCCESS } from "../type";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALL_PRODUCT_SUCCESS:
      localStorage.setItem("allproducts", JSON.stringify(payload));
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};

export default reducer;
