import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Product.css";

interface Formdata {
  category_id: number;
  product_name: string;
  product_description: string;
  available_qty: number;
  price: number;
  image: string;
}

const validationSchema = Yup.object({
  category_id: Yup.number().required("Required"),
  product_name: Yup.string().required("Required"),
  product_description: Yup.string().required("Required"),
  available_qty: Yup.number().required("Required"),
  price: Yup.number().required("Required"),
  // image: Yup.string().required("Required"),
});

const Product = () => {
  const navigate = useNavigate();

  const initialValues: Formdata = {
    category_id: 0,
    product_name: "",
    product_description: "",
    available_qty: 0,
    price: 0,
    image: "",
  };

  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      console.log(values);
      let data = {
        category_id: values.category_id,
        product_name: values.product_name,
        product_description: values.product_description,
        available_qty: values.available_qty,
        price: values.price,
        image: "abc.png",
      };
      let header: any = {
        x_auth_token: localStorage.getItem("token"),
      };
      let res = await axios.post(
        "http://localhost:3002/v1/api/product/add",
        data,
        { headers: header }
      );
      if (res.status == 200) {
        console.log("welcome");
        navigate("/showproduct");
        toast.success(res.data.message);
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="login_form">
            <div className="input_group">
              <label htmlFor="category_id" className="input_label">
                Select Category
              </label>
              <Field
                name="category_id"
                type="text"
                placeholder="Enter Category Name"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="product_name" className="input_label">
                Product name
              </label>
              <Field
                name="product_name"
                type="text"
                placeholder="Enter Product Name"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="product_description" className="input_label">
                Email
              </label>
              <Field
                name="product_description"
                type="text"
                placeholder="Enter Product Description"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="available_qty" className="input_label">
                Avail QTY
              </label>
              <Field
                name="available_qty"
                type="text"
                placeholder="Enter Qty"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="price" className="input_label">
                Price
              </label>
              <Field
                name="price"
                type="text"
                placeholder="Enter Price"
                className="form_input"
              />
            </div>

            <div className="login_button_div">
              <button
                className={`loginBtn ${
                  !formik.dirty || !formik.isValid
                    ? "btnDisable"
                    : "login_button"
                }`}
                disabled={!formik.dirty || !formik.isValid}
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Product;
