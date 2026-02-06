import api from './api';

const PRODUCTION_ENDPOINT = '/api/production';

const productionService = {
  // Retorna sugestões de produtos que podem ser produzidos com o estoque atual
  getSuggestions: async () => {
    try {
      const response = await api.get(`${PRODUCTION_ENDPOINT}/suggestions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default productionService;
