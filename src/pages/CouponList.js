import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  deleteCoupon,
  getCoupons,
  resetState,
} from "features/coupon/couponSlice";
import CustomModal from "components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponID, setCouponID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponID(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            className="fs-3 text-danger"
          >
            <FaEdit />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const onDeleteCoupon = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you Sure you want to Delete this Coupon?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          onDeleteCoupon(couponID);
        }}
      />
    </div>
  );
};

export default CouponList;
