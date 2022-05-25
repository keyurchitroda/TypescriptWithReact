import React from "react";
import {
  RouteProps,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import AccessDenied from "./AccessDenied";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props extends RouteProps {
  isAuth: boolean;
  roles: string;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuth, roles, children }: Props) => {
  const location = useLocation();

  let authToken = localStorage.getItem("token");
  let users = JSON.parse(localStorage.getItem("user") as any);

  if (authToken) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  const userHasRequiredRole =
    users && roles.includes(users.role) ? true : false;

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (isAuth && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
