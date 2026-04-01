import api from './api';
const customMediaService = {

  create: async (data) => {
    const response = await api.post('/api/custom-media', data);
    return response.data; 
  },

  update: async (id, data) => {
    const response = await api.put(`/api/custom-media/${id}`, data);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/custom-media/${id}`);
    const data = response.data;
    return {
       ...data,
       author: data.customAuthor || 'Autor Desconocido',
       imageUrl: (data.imageUrl && data.imageUrl.trim() !== '') ? data.imageUrl : null, 
       totalChapters: data.customTotalChapters || 0,
       status: data.customStatus || 'CUSTOM',
       description: data.description || 'Ficha personalizada subida por ti a Kokoni.',
       genres: ['Custom', 'Público'],
      //  averageScore: '-',
      //  rankPosition: null,
      //  readersCount: 1,
    
      //  isAddedInTracker: false,
      //  trackerId: null,
      //  readChapters: []
    };
  }
};
export default customMediaService;