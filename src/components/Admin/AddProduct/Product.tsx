import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { checkAddProduct } from "../../API/product";
import { ShowCategory } from "../../../redux/action/category";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";

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
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state: any) => state.AllCategory.category.rows);

  console.log("category", category);
  useEffect(() => {
    dispatch(ShowCategory());
  }, []);

  const initialValues: Formdata = {
    category_id: 0,
    product_name: "",
    product_description: "",
    available_qty: 0,
    price: 0,
    image: "",
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myapp_image");
    data.append("cloud_name", "keyur");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/keyur/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data", data);

        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  let submitAction: string | undefined = undefined;

  const onSubmit = async (values: any, onSubmitProps: any) => {
    if (submitAction != "secondary") {
      try {
        console.log(values);
        let data = {
          category_id: 1,
          product_name: values.product_name,
          product_description: values.product_description,
          available_qty: values.available_qty,
          price: values.price,
          image: url,
        };

        let res: any = await checkAddProduct(data);
        if (res.status == 200) {
          console.log("welcome");
          navigate("/showproduct");
          toast.success(res.message);
        }
      } catch (err: any) {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    } else {
      uploadImage();
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
              {/* <Field
                name="category_id"
                type="text"
                placeholder="Enter Category Name"
                className="form_input"
              /> */}
              <select name="category_id" className="form_input_select">
                <option value="" label="Select a category">
                  Select a color{" "}
                </option>
                {category &&
                  category.map((cat: any) => {
                    return <option value={cat.id} label={cat.category_name} />;
                  })}
              </select>
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
                Product Description
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

            <div className="input_group_image">
              <input
                type="file"
                onChange={(e: any) => setImage(e.target.files[0])}
                className="form_input_image"
              ></input>
            </div>
            <button
              onClick={() => {
                submitAction = "secondary";
              }}
              disabled={!formik.dirty || !formik.isValid}
            >
              Upload
            </button>
            <div className="showimg">
              {/* <h1>Uploaded image will be displayed here</h1> */}
              <img src={url} width="200px" height="200px" alt="" />
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
                onClick={() => {
                  submitAction = "primary";
                }}
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
