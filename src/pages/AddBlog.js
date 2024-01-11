import CustomInput from "components/CustomInput";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlogs, resetState } from "features/blogs/blogSlice";
import { getBlogCategories } from "features/blogCategory/blogCategorySlice";

let blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  blogCategory: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const blogState = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = blogState;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      blogCategory: "",
      images: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
        </div>
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <select
          name="blogCategory"
          onChange={formik.handleChange("blogCategory")}
          onBlur={formik.handleBlur("blogCategory")}
          value={formik.values.blogCategory}
          className="form-control py-3 mt-3"
        >
          <option value="">Select Blog Category</option>
          {blogCategoryState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.blogCategory && formik.errors.blogCategory}
        </div>
        <ReactQuill
          theme="snow"
          name="description"
          className="mt-3"
          onChange={formik.handleChange("description")}
          value={formik.values.description}
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <div className="bg-white border-1 p-5 text-center mt-3">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimages d-flex flex-wrap mt-3 gap-3">
          {imgState?.map((i, j) => {
            return (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
