import React, { useEffect, useState } from "react";
import "./ShowProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../../redux/action/product";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ShowCategory } from "../../../redux/action/category";
import { SHOW_ALL_PRODUCT_SUCCESS } from "../../../redux/type";
import {
  checkSearchProduct,
  checkSearchProductByCategory,
} from "../../API/product";

const ShowProduct = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [catbysearch, setCatBySearch] = useState("");

  const product = useSelector((state: any) => state.product.products);
  const category = useSelector((state: any) => state.AllCategory.category.rows);

  console.log("category", category);
  useEffect(() => {
    dispatch(ShowAllProduct());
  }, []);

  useEffect(() => {
    dispatch(ShowCategory());
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

  const onClick = () => {
    navigate("/addproduct");
  };

  return (
    <div className="conatainer">
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
