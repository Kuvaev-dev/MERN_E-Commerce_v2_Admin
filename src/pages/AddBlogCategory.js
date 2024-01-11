import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBlogCategory, resetState } from "features/blogCategory/blogCategorySlice";

let blogCategorySchema = Yup.object().shape({
  title: Yup.string().required("Blog Category Name is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } =
    newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: blogCategorySchema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
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
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
