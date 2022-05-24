import React, { useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowMyOrder } from "../../redux/action/myorder";
import { Dispatch } from "redux";

const Myorder = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const myorder: any = useSelector((state: any) => state.myOrder.myorders);
  console.log("myorder", myorder);

  useEffect(() => {
    dispatch(ShowMyOrder());
  }, []);

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {myorder &&
          myorder.map((order: any, index: any) => {
            let myorderParse: any = JSON.parse(order.product);
            console.log("0-0-0-0-0-0-0-", myorderParse);

            return (
              <>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    Order no: {order.order_number}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="conatainer">
                      <table>
                        <tr>
                          <th>Product Image</th>
                          <th>Product name</th>
                          <th>Product description</th>
                          <th>Product qty</th>
                          <th>Product Price</th>
                          <th>Order status</th>
                        </tr>
                        {myorderParse &&
                          myorderParse.map((prod: any) => {
                            console.log(prod, "product");
                            return (
                              <>
                                <tr>
                                  <img
                                    src="https://images.unsplash.com/photo-1652891179429-cfcabfa6e16c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500"
                                    width="100px"
                                    height="100px"
                                  />
                                  <td>{prod.product_name}</td>
                                  <td>{prod.product_description}</td>
                                  <td>{prod.qty}</td>
                                  <td>{prod.price * prod.qty}</td>
                                  <td>{order.order_status}</td>
                                </tr>
                              </>
                            );
                          })}
                      </table>
                      <div style={{ color: "red" }}>
                        Total Amount : {order.price}
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            );
          })}
      </Accordion>
    </div>
  );
};

export default Myorder;
