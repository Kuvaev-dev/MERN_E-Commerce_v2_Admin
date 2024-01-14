import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteBlog, getBlogs, resetState } from "features/blogs/blogSlice";
import CustomModal from "components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogID, setblogID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogID(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,
      action: (
        <>
          <Link
            to={`/admin/blog/${getBlogState[i].id}`}
            className=" fs-3 text-danger"
          >
            <FaEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(getBlogState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const onDeleteBlog = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          onDeleteBlog(blogID);
        }}
        title="Are you Sure you want to Delete this Blog?"
      />
    </div>
  );
};

export default BlogList;
