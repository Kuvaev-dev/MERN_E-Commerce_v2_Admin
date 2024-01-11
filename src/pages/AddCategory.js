import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategory, resetState } from "features/productCategory/productCategorySlice";

let productCategorySchema = Yup.object().shape({
  title: Yup.string().required("Product Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newProductCategory = useSelector((state) => state.productCategory);
  const { isSuccess, isError, isLoading, createdProductCategory } =
    newProductCategory;
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: productCategorySchema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product Category</h3>
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
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
