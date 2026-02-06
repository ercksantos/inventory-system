import api from './api';

const RAW_MATERIAL_ENDPOINT = '/api/raw-materials';

const rawMaterialService = {
  getAll: async () => {
    try {
      const response = await api.get(RAW_MATERIAL_ENDPOINT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`${RAW_MATERIAL_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (rawMaterialData) => {
    try {
      const response = await api.post(RAW_MATERIAL_ENDPOINT, rawMaterialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, rawMaterialData) => {
    try {
      const response = await api.put(`${RAW_MATERIAL_ENDPOINT}/${id}`, rawMaterialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await api.delete(`${RAW_MATERIAL_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default rawMaterialService;
