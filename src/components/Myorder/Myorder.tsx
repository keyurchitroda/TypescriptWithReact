import React, { useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowMyOrder } from "../../redux/action/myorder";
import { Dispatch } from "redux";
import StripeCheckout from "react-stripe-checkout";
import { checkPayment } from "../API/payment";
import { useNavigate, Link } from "react-router-dom";

const Myorder = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const myorder: any = useSelector((state: any) => state.myOrder.myorders);

  useEffect(() => {
    dispatch(ShowMyOrder());
  }, []);

  const makePayment = async (id: any) => {
    console.log("id", id);
    const data = {
      order_id: id,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    };
    const res: any = await checkPayment(data);
    if (res) {
      window.open(res.session);
    }
  };

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
                          <th>Payment status</th>
                        </tr>
                        {myorderParse &&
                          myorderParse.map((prod: any) => {
                            console.log(prod, "product");
                            return (
                              <>
                                <tr>
                                  <img
                                    src={prod.image}
                                    width="100px"
                                    height="100px"
                                  />
                                  <td>{prod.product_name}</td>
                                  <td>{prod.product_description}</td>
                                  <td>{prod.qty}</td>
                                  <td>{prod.price * prod.qty}</td>
                                  <td>{order.order_status}</td>
                                  <td>{order.payment_status}</td>
                                </tr>
                              </>
                            );
                          })}
                      </table>
                      <div style={{ color: "red" }}>
                        Total Amount : {order.price}
                        {/* <StripeCheckout
                          stripeKey="pk_test_51L3YnpSGF5MQb5T8vaE9em94ixS4ruXtNWLcrdVLJBBE6ZfOB2LDNdGnbWDVBK0kiePsYC5w2bZOX9LlgA5GUbXW00v6SXJxtl"
                          token={(tok) => makePayment(tok, order.id)}
                          name="Make Payment"
                          amount={order.price * 100}
                          currency="USD"
                        /> */}
                        {order.payment_status == "Pending" ? (
                          <button onClick={() => makePayment(order.id)}>
                            Payment ${order.price * 100}
                          </button>
                        ) : (
                          ""
                        )}
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
