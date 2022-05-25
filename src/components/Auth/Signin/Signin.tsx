import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Signin.global.css";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Auth } from "../../../redux/action/auth";
import { Dispatch } from "redux";

interface Formdata {
  email: string;
  password: string;
}

interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});

const Signin: React.FC<Props> = ({ setIsAuth }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const initialValues: Formdata = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      console.log(values);
      let data = {
        email: values.email,
        password: values.password,
      };
      await dispatch(Auth(data, navigate, toast, setIsAuth));
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="main">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik: any) => (
          <Form className="login_form">
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
                type="password"
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
                Sign In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
