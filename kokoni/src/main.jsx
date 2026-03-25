import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import  router  from './router/Index';
import './index.css';
import { ModalProvider } from './context/ModalContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <RouterProvider router={router}/>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
)
