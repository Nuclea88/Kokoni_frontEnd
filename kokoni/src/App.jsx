import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
// Componente para proteger rutas (Dashboard, etc)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <div>Cargando...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};
// Componente placeholder del dashboard temporal
const DashboardMock = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold text-primary mb-4">Dashboard Kokoni</h1>
    <p>¡Has iniciado sesión con éxito!</p>
  </div>
);
function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardMock /></PrivateRoute>} />
    </Routes>
  );
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;