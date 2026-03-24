import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kokoni_token') || null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      // Idealmente, se llama a un /api/me para verificar si el token sigue vivo
      // Para arrancar, asumimos que estamos logueados si hay token
      setUser({ username: 'KuroNeko_99', role: 'USER' }); 
      localStorage.setItem('kokoni_token', token);
    } else {
      setUser(null);
      localStorage.removeItem('kokoni_token');
    }
    setLoading(false);
  }, [token]);
  const login = async (username, password) => {
    // Aquí iría tu fetch al Spring Boot. Ejemplo mock:
    /*
    const res = await fetch('http://localhost:8080/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setToken(data.token);
    */
    
    // Mock login directo para ver el UI sin backend obligatorio:
    setToken('eyMockToken123...');
  };
  const logout = () => {
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};