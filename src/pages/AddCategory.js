import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCategory,
  getCategory,
  resetState,
  updateCategory,
} from "features/productCategory/productCategorySlice";

let productCategorySchema = Yup.object().shape({
  title: Yup.string().required("Product Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getProductCategoryID = location.pathname.split("/")[3];
  const newProductCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newProductCategory;
  useEffect(() => {
    if (getProductCategoryID !== undefined) {
      dispatch(getCategory(getProductCategoryID));
    } else {
      dispatch(resetState());
    }
  }, [getProductCategoryID]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Product Category Added Successfully");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Product Category Updated Successfullly!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: productCategorySchema,
    onSubmit: (values) => {
      if (getProductCategoryID !== undefined) {
        const data = { id: getProductCategoryID, productCategoryData: values };
        dispatch(updateCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductCategoryID !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getProductCategoryID !== undefined ? "Edit" : "Add"} Product
            Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
