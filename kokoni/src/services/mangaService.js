import api from './api';

const mangaService = {
  
  search: async (title, page = 0) => {
    const response = await api.get('/api/mangas/search', {
      params: { title, page }
    });
    return response.data; 
  },
  
  getById: async (externalId) => {
    const response = await api.get(`/api/mangas/${externalId}`);
    return response.data;
  }
};
export default mangaService;