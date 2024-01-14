import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getBlogCategories,
  resetState,
} from "features/blogCategory/blogCategorySlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

const BlogCategoriesList = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryID, setBlogCategoryID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCategoryID(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);
  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const data1 = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <FaEdit />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(blogCategoryState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const onDeleteBlogCategory = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you Sure you want to Delete this Blog Category?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          onDeleteBlogCategory(blogCategoryID);
        }}
      />
    </div>
  );
};

export default BlogCategoriesList;
