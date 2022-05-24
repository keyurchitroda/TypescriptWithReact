import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  INCREAMENT_QTY,
  DECREAMENT_QTY,
} from "../type";

const initialState = {
  cartItems: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };

    case REMOVE_TO_CART:
      return {
        state,
      };

    case INCREAMENT_QTY:
      let updateCart = state.cartItems.map((item: any) => {
        if (item.id === payload) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      return { ...state, cartItems: updateCart };

    case DECREAMENT_QTY:
      let updateDecCart = state.cartItems.map((item: any) => {
        if (item.id === payload) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      return { ...state, cartItems: updateDecCart };

    default:
      return state;
  }
};

export default reducer;
