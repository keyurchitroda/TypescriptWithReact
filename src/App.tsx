import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin/Signin";
import { ToastContainer, toast } from "react-toastify";
import ShowProduct from "./components/Admin/ShowAllProducts/ShowProduct";
import Product from "./components/Admin/AddProduct/Product";
import NavbarApp from "./components/NavbarApp";
import Cart from "./components/Home/Cart";
import Myorder from "./components/Myorder/Myorder";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import PendingOrder from "./components/Admin/Pendingorder/PendingOrder";
import Users from "./components/Admin/Users/Users";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="">
      <ToastContainer />
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setIsAuth={setIsAuth} />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth} roles="user">
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/showproduct"
            element={
              <ProtectedRoute isAuth={isAuth} roles="admin">
                <ShowProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRoute isAuth={isAuth} roles="admin">
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuth={isAuth} roles="user">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorder"
            element={
              <ProtectedRoute isAuth={isAuth} roles="user">
                <Myorder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuth={isAuth} roles="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending"
            element={
              <ProtectedRoute isAuth={isAuth} roles="admin">
                <PendingOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showuser"
            element={
              <ProtectedRoute isAuth={isAuth} roles="admin">
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
