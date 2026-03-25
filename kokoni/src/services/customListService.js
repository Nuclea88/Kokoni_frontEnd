import api from './api';
const customListService = {

  getMyLists: async () => {
    const response = await api.get('/api/lists');
    return response.data;
  },

  getListDetails: async (listId) => {
    const response = await api.get(`/api/lists/${listId}`);
    return response.data;
  },
  
  createList: async (listName) => {
    const response = await api.post('/api/lists', { 
      name: listName, 
      isPublic: false 
    });
    return response.data;
  },
  
  addCustomMediaToList: async (listId, customMediaId) => {
    await api.post(`/api/lists/${listId}/items/${customMediaId}`);
  },

  removeFromAllLists: async (id) => {
    await api.delete(`/api/lists/items/external/${id}`);
  }
};
export default customListService;