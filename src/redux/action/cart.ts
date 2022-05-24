import { ADD_TO_CART, REMOVE_TO_CART,INCREAMENT_QTY,DECREAMENT_QTY } from "../type";

export const AddToCart =
  (produdct: any) => async (dispatch: any, getState: any) => {
    console.log("product", produdct);
    try {
      dispatch({
        type: ADD_TO_CART,
        payload: produdct,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (err: any) {}
  };

export const RemoveTAllCart = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: REMOVE_TO_CART,
    });
    localStorage.removeItem("cartItems");
  } catch (err: any) {}
};


export const addCount = (id:any) => async (dispatch: any) => {
    try {
      dispatch({
        type: INCREAMENT_QTY,
        payload:id
      });
    } catch (err: any) {}
  };

  export const addCountMinus = (id:any) => async (dispatch: any) => {
    try {
      dispatch({
        type: DECREAMENT_QTY,
        payload:id
      });
    } catch (err: any) {}
  };