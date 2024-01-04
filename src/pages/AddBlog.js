import CustomInput from "components/CustomInput";
import React, { useState } from "react";
import RichTextEditor from "react-rte";

const AddBlog = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <form action="">
        <CustomInput type="text" label="Enter Blog Title" />
        <select name="" id="">
          <option value="">Select Blog Category</option>
        </select>
        <RichTextEditor
          value={this.state.value}
          onChange={(evt) => {
            handleDesc(evt.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default AddBlog;
