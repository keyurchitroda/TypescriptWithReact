import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../redux/action/product";
import { Dispatch } from "redux";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cart from "./Cart";
import { AddToCart } from "../../redux/action/cart";
import {
  checkSearchProduct,
  checkSearchProductByCategory,
} from "../API/product";
import { SHOW_ALL_PRODUCT_SUCCESS } from "../../redux/type";
import { ShowCategory } from "../../redux/action/category";

const Home = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const [search, setSearch] = useState("");
  const [catbysearch, setCatBySearch] = useState("");

  const product = useSelector((state: any) => state.product.products);
  const cart = useSelector((state: any) => state.cartReducer.cartItems);

  const category = useSelector((state: any) => state.AllCategory.category.rows);

  console.log("category", category);
  useEffect(() => {
    dispatch(ShowCategory());
  }, []);

  useEffect(() => {
    dispatch(ShowAllProduct());
  }, []);

  const searchProduct = async () => {
    let res: any = await checkSearchProduct(search);
    dispatch({
      type: SHOW_ALL_PRODUCT_SUCCESS,
      payload: res.response_data,
    });
  };

  const searchProductByCategory = async () => {
    let res: any = await checkSearchProductByCategory(catbysearch);
    dispatch({
      type: SHOW_ALL_PRODUCT_SUCCESS,
      payload: res.response_data,
    });
  };

  useEffect(() => {
    searchProduct();
  }, [search]);

  useEffect(() => {
    searchProductByCategory();
  }, [catbysearch]);

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
        <div className="searchText">
          <div style={{ marginRight: "16px" }}>
            <input
              type="text"
              placeholder="Search product"
              value={search}
              style={{ width: "200px", height: "40px" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <select
              name="cars"
              id="cars"
              value={catbysearch}
              onChange={(e) => setCatBySearch(e.target.value)}
              style={{ width: "200px", height: "40px" }}
            >
              <option value="" label="Select a category">
                Select a Category
              </option>
              {category &&
                category.map((cat: any) => {
                  return <option value={cat.id} label={cat.category_name} />;
                })}
            </select>
          </div>
        </div>
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
                    <img className="part-1" src={prod.image} />
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
