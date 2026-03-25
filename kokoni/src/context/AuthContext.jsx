import { createContext, useState, useEffect } from 'react';
import  authService  from '../services/authService';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kokoni_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData); 
          localStorage.setItem('kokoni_token', token);
        } catch (error) {
          console.error("Token inválido o cuenta borrada", error);
          logout();
        }
      } else {
        setUser(null);
        localStorage.removeItem('kokoni_token');
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (usernameOrEmail, password) => {
   const response = await authService.login(usernameOrEmail, password);
   const jwt = response.token || response.jwt || response; 
   localStorage.setItem('kokoni_token', jwt); 
   setToken(jwt);
  };

  const register = async (username, email, password, avatarUrl) => {
    return await authService.register(username, email, password, avatarUrl);
  };

  const logout = () => {
    setToken(null);
     setUser(null);
    localStorage.removeItem('kokoni_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};