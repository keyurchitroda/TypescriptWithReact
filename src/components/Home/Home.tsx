import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../redux/action/product";
import { Dispatch } from "redux";
import "./Home.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cart from "./Cart";
import { AddToCart } from "../../redux/action/cart";

const Home = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const product = useSelector((state: any) => state.product.products);
  const cart = useSelector((state: any) => state.cartReducer.cartItems);
  console.log("cart", cart);

  useEffect(() => {
    dispatch(ShowAllProduct());
  }, []);

  const [isLoggedIn, setisLoggedIn] = useState<any | null>(null);
  const accessToken: any = localStorage.getItem("token");
  console.log(accessToken);
  const decodedToken: any = jwt_decode(accessToken);

  useEffect(() => {
    if (accessToken == null) {
      navigate("/signin");
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
      if (decodedToken.role == "admin") {
        navigate("/showproduct");
      } else {
        navigate("/");
      }
    }
  }, []);

  const addTocart = (productData: any): any => {
    console.log(productData);
    dispatch(AddToCart(productData));
  };

  const addtocart = () => {
    navigate("/cart");
  };

  return (
    <>
      <section className="section-products">
        <div
          className="cart"
          style={{
            color: "red",
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "38px",
            top: "32px",
          }}
          onClick={() => addtocart()}
        >
          <i className="fas fa-shopping-cart fa-2xl">
            <p className="len">{cart?.length}</p>
          </i>
        </div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8 col-lg-6">
              <div className="header">
                <h3>Featured Product</h3>
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>
          <div className="row mystyle">
            {product.map((prod: any) => (
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div id="product-1" className="single-product">
                  <div className="part-1">
                    <ul>
                      <li>
                        <a href="#" onClick={() => addTocart(prod)}>
                          <i className="fas fa-shopping-cart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-expand"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="part-2">
                    <h3 className="product-title">{prod.product_name}</h3>
                    {/* <h4 className="product-old-price">Rs. 16000</h4> */}
                    <p className="product_description">
                      {prod.product_description}
                    </p>
                    <h4 className="product-price">Rs. {prod.price}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
