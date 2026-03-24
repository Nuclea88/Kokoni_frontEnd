import api from './api';
const customMediaService = {
  create: async (data) => {
    // data = { title, description, imageUrl, customAuthor, customTotalChapters, baseMangaId }
    const response = await api.post('/api/custom-media', data);
    return response.data; 
  },
  getById: async (id) => {
    const response = await api.get(`/api/custom-media/${id}`);
    return response.data;
  }
};
export default customMediaService;