import React, { useEffect } from "react";
import "./ShowProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowAllProduct } from "../../../redux/action/product";
import { Dispatch } from "redux";
const ShowProduct = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const product = useSelector((state: any) => state.product.products);
  console.log(product);
  useEffect(() => {
    dispatch(ShowAllProduct());
  }, []);

  return (
    <div className="conatainer">
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
                    <img
                      src="https://images.unsplash.com/photo-1652891179429-cfcabfa6e16c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500"
                      width="100px"
                      height="100px"
                    />
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
