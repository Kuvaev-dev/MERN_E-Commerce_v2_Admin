import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "features/blogCategory/blogCategorySlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  const dispatch = useDispatch();
  useEffect(() => {
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
          <Link className="fs-3 text-danger" to="/">
            <FaEdit />
          </Link>
          <Link className="fs-3 text-danger ms-3" to="/">
            <MdDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCategoriesList;
