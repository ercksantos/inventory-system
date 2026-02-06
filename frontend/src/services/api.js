import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Interceptor para requisições (pode adicionar tokens de autenticação aqui no futuro)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tratamento global de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erro padrão
    let errorMessage = 'Erro ao conectar com a API';

    if (error.response) {
      // O servidor respondeu com um código de erro
      const status = error.response.status;
      const data = error.response.data;

      if (data && data.message) {
        errorMessage = data.message;
      } else {
        switch (status) {
          case 400:
            errorMessage = 'Requisição inválida';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor';
            break;
          default:
            errorMessage = `Erro ${status}: ${error.response.statusText}`;
        }
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      errorMessage = 'Servidor não está respondendo. Verifique se o backend está rodando.';
    } else {
      // Algo aconteceu ao configurar a requisição
      errorMessage = error.message || 'Erro desconhecido';
    }

    console.error('API Error:', errorMessage, error);

    // Adiciona a mensagem de erro ao objeto error para facilitar o acesso
    error.userMessage = errorMessage;

    return Promise.reject(error);
  }
);

export default api;
