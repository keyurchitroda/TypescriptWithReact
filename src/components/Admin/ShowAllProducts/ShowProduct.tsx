import React, { useEffect, useState } from "react";
import "./ShowProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../../redux/action/product";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ShowCategory } from "../../../redux/action/category";

const ShowProduct = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: any) => state.product.products);
  const category = useSelector((state: any) => state.AllCategory.category.rows);

  console.log("category", category);
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

  useEffect(() => {
    dispatch(ShowCategory());
  }, []);

  const onClick = () => {
    navigate("/addproduct");
  };

  return (
    <div className="conatainer">
      <div className="buttonprod">
        <button onClick={onClick} className="add">
          Add Product
        </button>
      </div>

      <h2>Product</h2>

      <table>
        <tr>
          <th>Category</th>
          <th>Product name</th>
          <th>Product description</th>
          <th>Product Available qty</th>
          <th>Product Price</th>
          <th>Product Image</th>
        </tr>
        {product &&
          product.map((prod: any) => {
            return (
              <>
                <tr>
                  <td>{prod.category.category_name}</td>
                  <td>{prod.product_name}</td>
                  <td>{prod.product_description}</td>
                  <td>{prod.available_qty}</td>
                  <td>{prod.price}</td>
                  <td>
                    <img src={prod.image} width="100px" height="100px" />
                  </td>
                </tr>
              </>
            );
          })}
        ;
      </table>
    </div>
  );
};

export default ShowProduct;
