import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../redux/action/product";
import { Dispatch } from "redux";
import "./Home.css";

const Home = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const product = useSelector((state: any) => state.product.products);
  console.log(product);
  useEffect(() => {
    dispatch(ShowAllProduct());
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <ul className="product-list">
            {product.map((prod: any) => (
              <li>
                <div className="product">
                  <div className="product-image">
                    <img src="https://images.unsplash.com/photo-1652891179429-cfcabfa6e16c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500" />
                  </div>
                  <div className="product-imformation">
                    <h4>{prod.product_name}</h4>
                    <div className="specification">
                      <span> {prod.product_description}</span>
                      <small className="line"></small>
                      <span>available-qty : {prod.available_qty}</span>
                    </div>
                    <span>Rs. {prod.price}</span>
                  </div>
                </div>
                <div className="button">
                  <button className="addToCart">Add To Cart</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
