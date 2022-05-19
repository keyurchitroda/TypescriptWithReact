import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Signup.global.css";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Formdata {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const initialValues: Formdata = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      console.log(values);
      let data = {
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        password: values.password,
      };
      let res = await axios.post(
        "http://localhost:3002/v1/api/auth/signup",
        data
      );
      if (res.status == 200) {
        console.log("welcome");
        navigate("/signin");
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
              <label htmlFor="first_name" className="input_label">
                First name
              </label>
              <Field
                name="first_name"
                type="text"
                placeholder="Enter First Name"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="last_name" className="input_label">
                Last name
              </label>
              <Field
                name="last_name"
                type="text"
                placeholder="Enter Last Name"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="email" className="input_label">
                Email
              </label>
              <Field
                name="email"
                type="text"
                placeholder="Enter Email"
                className="form_input"
              />
            </div>

            <div className="input_group">
              <label htmlFor="password" className="input_label">
                Password
              </label>
              <Field
                name="password"
                type="text"
                placeholder="Enter Password"
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
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
