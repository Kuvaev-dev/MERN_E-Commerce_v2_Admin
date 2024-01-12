import axios from "axios";
import { config } from "utils/axiosConfig";
import { base_url } from "utils/base_url";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createProductCategory = async (productCategory) => {
  const response = await axios.post(
    `${base_url}category/`,
    productCategory,
    config
  );
  return response.data;
};

const updateProductCategory = async (productCategory) => {
  const response = await axios.put(
    `${base_url}category/${productCategory.id}`,
    { title: productCategory.productCategoryData.title },
    config
  );
  return response.data;
};

const getSingleProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const productCategoryService = {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  getSingleProductCategory,
  deleteProductCategory,
};

export default productCategoryService;
