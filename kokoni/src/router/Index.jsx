import { createBrowserRouter, Navigate } from 'react-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import  Home  from '../pages/Home';
import DashboardLayout from '../components/templates/DashboardLayout';
import { PrivateRoute } from './PrivateRoute';
import { MangaDetails } from '../pages/MangaDetails';

const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },{
    //borrar, solo pruebas
    path:"/prueba",
    element: <DashboardLayout />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "manga/:id",
        element: <MangaDetails />
      },
      {
        path: "novedad",
        element: <div className="animate-fade-in-up uppercase text-xs font-bold text-primary">Sección Novedades</div>
      },
      {
        path: "explorar",
        element: <div className="animate-fade-in-up uppercase text-xs font-bold text-secondary">Explorador de Mangas</div>
      },
      {
        path: "ajustes",
        element: <div className="animate-fade-in-up uppercase text-xs font-bold text-textMuted text-center">Configuraciones de Usuario</div>
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />
  }
]);
export default router;