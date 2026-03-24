import { createBrowserRouter, Navigate } from 'react-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import  Home  from '../pages/Home';
import DashboardLayout from '../components/templates/DashboardLayout';
import { PrivateRoute } from './PrivateRoute';
import { MangaDetails } from '../pages/MangaDetails';
import  Explore  from '../pages/Explore';
import Settings from '../pages/Settings';

const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
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
        element: <div className="animate-fade-in-up uppercase text-xs font-bold text-primary">Sección Novedades: próximamente</div>
      },
      {
        path: "explorar",
        element: <Explore />
      },
      {
        path: "ajustes",
        element: <Settings />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />
  }
]);
export default router;