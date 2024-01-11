import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor, resetState } from "features/color/colorSlice";

let colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully");
      //state.createColor = "";
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
