import api from './api';

const productRawMaterialService = {
  getByProduct: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/raw-materials`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToProduct: async (productId, data) => {
    try {
      const response = await api.post(`/api/products/${productId}/raw-materials`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (productId, rawMaterialId, data) => {
    try {
      const response = await api.put(
        `/api/products/${productId}/raw-materials/${rawMaterialId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromProduct: async (productId, rawMaterialId) => {
    try {
      const response = await api.delete(
        `/api/products/${productId}/raw-materials/${rawMaterialId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default productRawMaterialService;
