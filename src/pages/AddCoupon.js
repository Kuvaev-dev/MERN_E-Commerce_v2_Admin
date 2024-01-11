import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupons, resetState } from "features/coupon/couponSlice";

let couponSchema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
