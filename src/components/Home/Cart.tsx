import React, { useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCount,
  addCountMinus,
  RemoveTAllCart,
} from "../../redux/action/cart";
import { checkNewOrder } from "../API/order";
import { useNavigate } from "react-router-dom";
import { REMOVE_TO_CART } from "../../redux/type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(1) as any;

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cartReducer.cartItems);

  const initialValue = 0;
  const total = cart?.reduce(
    (accumulator: any, current: any) =>
      accumulator + current.price * current.qty,
    initialValue
  );

  console.log("total", total);

  const onSubmit = async () => {
    console.log("order cart", cart);
    // let cartData = cart.map((cartdata: any) => {
    //   return {
    //     id: cartdata.id,
    //     qty: cartdata.qty,
    //   };
    // });
    console.log("cartData", cart);
    let data = {
      product: cart,
      total_price: total,
    };

    let res: any = await checkNewOrder(data);
    console.log("res", res);
    if (res.status === 200) {
      dispatch({
        type: REMOVE_TO_CART,
      });
      localStorage.removeItem("cartItems");
      navigate("/myorder");
      toast.success(res.message);
    }
  };

  return (
    <div className="body">
      <div className="Cart-Container">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          <h5 className="Action" onClick={() => dispatch(RemoveTAllCart())}>
            Remove all
          </h5>
        </div>

        {cart &&
          cart.map((cartItem: any, index: any) => (
            <div className="Cart-Items">
              <div className="image-box">
                <img src={cartItem.image} style={{ height: "120px" }} />
              </div>
              <div className="about">
                <h1 className="title">{cartItem.product_name}</h1>
                {/* <h3 className="subtitle">{cartItem.product_description}</h3> */}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AgAAAfQBIkEj2+/Z5tHl3tHfr9+sAfAAAeQAAeAAAcgAAdAAAdgD6/fr0+fRhnmFhmmHq8urL4cvE3MSozajZ6dlDk0Mriiuo0KhysnIQgRBBjkHX7df0/PSHvYdgo2B8rnxYnliwz7Dl8uVYmVi82ryYxZgyiTJlq2XV59VnqGdRm1Gpyqk1kjU+kz4tmFfcAAAEuklEQVR4nO2da1viOhRGaXUgKVC5FYEiymUEQeX//7vT4nFmHiW1IeydNH3Xt/kwhvXknp3sNhoAAAAAAAAAAAAAAAAAiolvq0R8geC0+as6NKf6irczGVYHObvVN2yGQXUImzBUGtpufiUwM0znN64zT40M5w8t13mYmxiGNy3t/8hN6yaE4Xlg6AwwVAJDZ4ChEhg6AwyVwNAZYKgEhs4AQyUwdAYYKoGhM8BQCQw1WYyHyePhqdfv93tPh8dkOF5c6S/bN4wHw7eXVHTb3UgKEYahEDLK/iXSl7fh4ILI5hcsG8b7ZHkfdOW5OFYou8H9MtkbSlo1XGxXO3HW7q+l2K22dyaF2DO8Gx1kR5SI/YmOPIwul7Rl2Fr3oqh0gDOKeuvBpSXZMXw+ClnaL0eK4/NlRdkwjEfvHf0Qedh5H10y6FgwHC9Ldb/viM5yrF8cv2Eyuczv5DiZapfHbThetU3ucITt1UazRGbD9U5vgPmO3K31iuQ1TIT5JRwhE60yOQ0Hh7axX077oDM3MhpuXk1b6CfyVaMz8hlufl9LMFP8XV6RzXA/uZ5gpjjZu2a4MZgFzyEmZWuRyfCaTfSD0g2Vx3BwtUHmH8XXciMqj+Hh+oKZ4sEdw+Q68+BX2qWmfg7DNUUN5sgyCzgGw/GE6r602JUYbRgMV1RVmFXiygVDok74QYmuSG5I10ZzwsmPu35qw3h53bXMV8Typ7MbasNRh1QwCDojy4bvtFWYVeK7XcNn6irMKvGHc1Raw8GR/ulQeCxen9Iarqnb6EmxeGVDanjXo5vs/yJ7hWEbUsNR+diLCVHhcEpqeGAyLNxGURouONpojihqppSG2y6TYWdrxzBecYykOWJVsHQjNNzvmASDYFdwtkhomHBVYVaJbzYM4yXXQJNNiQU7DDrDwT39iu2T8F69cqMzHLL55YpDC4ZvXHNFTlfdEekMX/i6YdYRXywYpnzdMPshKb/hgm+uyBHKy5pkhmPObph1ROWZG5nhkPKY9Dtt5WBKZpgw16HyaJjM8JFnb/hJ9MhuSBIyVCNn7IZPzGPpE7thj9mwx27Y55zws1/ShyEMtQ3974f+j6X+z4f+r2n8X5f6v7fwf3/o/x7f/3OaGpy1+X9eynrmHdg48/Y/buF/7Mn/+CFrDLjgDibi+AaGjS39tb0PbN3FaNx5f5/G/ztRNbjX5v/dRP/vlzLdES7+DbjnbWjo/139Gry38P/NjP/vnhqNqe9v10jfH0ZOvD9sjHdUXdGVN6R074BTR94B1+Atdw3e49cgp4L/eTFqkNukBvlpapBjqAZ5omqQ6ysjkebjjUjdzdfWuEbOvWinmeWTO2/ixve8iQ3T3Jd6LTQH+UuVIAdtMc/HUDOPcFilPMI5A+1c0BdnnbaZz1uUzOctqpjP+4TnOdlPnPLqh4V59cdVzqt/wvNvI/zh9H2L2f/ft5j59X0LamCoBIbOAEMlMHQGGCqBoTPAUAkMnQGGSmDoDDBUAkNngKESGDoDDJXUxDCYP7Rc52EemBim8xvXmadGhkHoPoGZYUWA4VnDmbTd/DSQM33DeNr8VR2a0wsCkfFtlTCPtAIAAAAAAAAAAAAAAIDv/Ad9t6LxPoQX0AAAAABJRU5ErkJggg=="
                  style={{ height: "30px" }}
                />
              </div>
              <div className="counter"></div>
              <div className="prices"></div>
              <div className="counter">
                <div
                  key={cartItem.id}
                  className="btn"
                  onClick={() => dispatch(addCount(cartItem.id))}
                >
                  +
                </div>
                <div className="count">{cartItem.qty}</div>
                <div
                  key={index}
                  className="btn"
                  onClick={() => dispatch(addCountMinus(cartItem.id))}
                >
                  -
                </div>
              </div>

              <div className="prices">
                <div className="amount">
                  Rs. {cartItem.price * cartItem.qty}
                </div>
                <div className="save">
                  <u>Save for later</u>
                </div>
                <div className="remove">
                  <u>Remove</u>
                </div>
              </div>
            </div>
          ))}
        <div className="checkout">
          <h1 style={{ marginLeft: "65px" }}>CheckOut</h1>
          <button onClick={onSubmit} style={{ marginRight: "65px" }}>
            Rs. {total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
