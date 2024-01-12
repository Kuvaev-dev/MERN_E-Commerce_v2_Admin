import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  resetState,
} from "features/productCategory/productCategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const CategoriesList = () => {
  const [open, setOpen] = useState(false);
  const [productCategoryID, setProductCategoryID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductCategoryID(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  const data1 = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: productCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <FaEdit />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(productCategoryState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const onDeleteProductCategory = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you Sure you want to Delete this Product Category?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          onDeleteProductCategory(productCategoryID);
        }}
      />
    </div>
  );
};

export default CategoriesList;
