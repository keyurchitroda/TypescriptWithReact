import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowPendingOrder } from "../../../redux/action/myorder";
import { ShowAllUser } from "../../../redux/action/auth";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const pendingorder: any = useSelector((state: any) => state.myOrder.myorders);
  const users: any = useSelector((state: any) => state.auth.users);
  console.log("users", users);
  useEffect(() => {
    dispatch(ShowPendingOrder());
    dispatch(ShowAllUser());
  }, []);

  const Show = () => {
    navigate("/pending");
  };
  const showUser = () => {
    navigate("/showuser");
  };

  return (
    <div>
      <div className="div2">
        <Card
          className="text-center"
          style={{ backgroundColor: "darkseagreen" }}
        >
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>
              Pending Orders ({pendingorder ? pendingorder?.length : 0})
            </Card.Title>
            <Card.Text>Show all pending orders.</Card.Text>
            <Button onClick={Show} variant="primary" className="button">
              Show
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">#welocme</Card.Footer>
        </Card>
      </div>

      <div className="div2">
        <Card
          className="text-center"
          style={{ backgroundColor: "greenyellow" }}
        >
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>
              All register user ({users ? users?.count : 0})
            </Card.Title>
            <Card.Text>Show all register users</Card.Text>
            <Button onClick={showUser} variant="primary" className="button">
              Show
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">#welocme</Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
