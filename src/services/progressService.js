import api from './api';
const progressService = {
  markAsRead: async (trackerId, chapterNum) => {
    const response = await api.post(`/api/trackers/${trackerId}/progress`, { 
      progressUnit: chapterNum
    });
    return response.data;
  },
  unmarkAsRead: async (trackerId, chapterNum) => {
    await api.delete(`/api/trackers/${trackerId}/progress/${chapterNum}`);
  }
};
export default progressService;