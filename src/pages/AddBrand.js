import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from "features/brand/brandSlice";

let brandSchema = Yup.object().shape({
  title: Yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandID = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandID !== undefined) {
      dispatch(getBrand(getBrandID));
    } else {
      dispatch(resetState());
    }
  }, [getBrandID]);
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully");
    }
    if (isSuccess && !updatedBrand) {
      toast.success("Brand Updated Successfully");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (getBrandID !== undefined) {
        const data = { id: getBrandID, brandData: values };
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        {getBrandID !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
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
            {getBrandID !== undefined ? "Update" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
