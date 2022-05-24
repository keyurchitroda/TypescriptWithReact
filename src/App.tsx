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

function App() {
  return (
    <div className="">
      <ToastContainer />
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/showproduct" element={<ShowProduct />} />
          <Route path="/addproduct" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pending" element={<PendingOrder />} />
          <Route path="/showuser" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
