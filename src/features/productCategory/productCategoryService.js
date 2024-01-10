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

const productCategoryService = {
  getProductCategories,
  createProductCategory,
};

export default productCategoryService;
