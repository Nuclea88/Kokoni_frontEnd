import  api  from './api';

const authService = {

  login: async (usernameOrEmail, password) => {
    try{
    const response = await api.post('/login', { usernameOrEmail, password }); 
    return response.data;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
  },

  register: async (username, email, password, avatarUrl = "") => {
    try{
    const response = await api.post('/register', { username, email, password, avatarUrl });
    return response.data;
    }catch (error){
        console.error("Error en el registro del usuario", error);
        throw error;
    }
  },

  getCurrentUser: async () => {
    try{
    const response = await api.get('/api/users/me');
    return response.data;
    } catch (error) {
            console.error ("Error obteniendo los datos del usuario", error);
            throw error;
        }
  }
};
export default authService;