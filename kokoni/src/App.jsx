import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/templates/DashboardLayout';
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
      <Route path="/register" element={<Register />} />
      
      {/* 
        Si está autenticado, el usuario entra al layout del Dashboard (con las barras superior e inferior).
        Todo lo que haya DENTRO de estas rutas se pintará entre ambas barras.
      */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
         <Route index element={
           <div className="animate-fade-in-up">
              <h2 className="text-textMuted text-xs font-bold tracking-widest mb-4">CONTINÚA LEYENDO</h2>
              <div className="p-8 text-center glass-panel">
                <p>Aquí pondremos tus mangas leyendo próximamente.</p>
              </div>
           </div>
         } />
         <Route path="novedad" element={<div className="text-center mt-10 animate-fade-in-up text-primary">Pronto: Sección de Novedades</div>} />
         <Route path="explorar" element={<div className="text-center mt-10 animate-fade-in-up text-secondary">Pronto: Explorador y Búsqueda</div>} />
         <Route path="ajustes" element={<div className="text-center mt-10 animate-fade-in-up">Pronto: Ajustes de Tema</div>} />
      </Route>
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