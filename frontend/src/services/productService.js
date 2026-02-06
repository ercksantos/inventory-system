import api from './api';

const PRODUCT_ENDPOINT = '/api/products';

const productService = {
  getAll: async () => {
    try {
      const response = await api.get(PRODUCT_ENDPOINT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`${PRODUCT_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (productData) => {
    try {
      const response = await api.post(PRODUCT_ENDPOINT, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, productData) => {
    try {
      const response = await api.put(`${PRODUCT_ENDPOINT}/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await api.delete(`${PRODUCT_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default productService;
