import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin/Signin";
import { ToastContainer, toast } from "react-toastify";
import ShowProduct from "./components/Admin/ShowAllProducts/ShowProduct";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/showproduct" element={<ShowProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
