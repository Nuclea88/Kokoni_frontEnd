import api from './api';

const trackerService = {
  add: async (externalMangaId) => {
    const response = await api.post('/api/trackers', {externalId: externalMangaId, 
      status: 'PLANNING', 
      score: null         
    });
    return response.data;
  },
  updateStatus: async (trackerId, newStatus, newScore, newNotes) => {
    const response = await api.put(`/api/trackers/${trackerId}`, { 
      status: newStatus, score: newScore, notes: newNotes 
    });
    return response.data;
  },
  remove: async (trackerId) => {
    await api.delete(`/api/trackers/${trackerId}`);
  },

  getMyTrackers: async () => {
    const response = await api.get('/api/trackers');
    return response.data;
  },
};
export default trackerService;