import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "features/color/colorSlice";

let colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorID = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;
  useEffect(() => {
    if (getColorID !== undefined) {
      dispatch(getColor(getColorID));
    } else {
      dispatch(resetState());
    }
  }, [getColorID]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      if (getColorID !== undefined) {
        const data = { id: getColorID, colorData: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorID !== undefined ? "Edit" : "Add"} Color
      </h3>
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
            {getColorID !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
