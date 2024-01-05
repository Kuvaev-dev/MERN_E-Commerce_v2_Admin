import CustomInput from "components/CustomInput";
import React from "react";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Product Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Product Category" />
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
