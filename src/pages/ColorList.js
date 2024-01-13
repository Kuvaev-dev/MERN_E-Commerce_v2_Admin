import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors, deleteColor, resetState } from "features/color/colorSlice";
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
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorID, setColorID] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorID(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colorState[i]._id}`}
            className="fs-3 text-danger"
          >
            <FaEdit />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const onDeleteColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you Sure you want to Delete this Color?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          onDeleteColor(colorID);
        }}
      />
    </div>
  );
};

export default ColorList;
