import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon';
import CadastroVoluntario from './pages/CadastroVoluntario';
import Voluntario from './pages/Voluntario';
import AlterarVoluntario from './pages/AlterarVoluntario';
import CadastroAnimal from './pages/CadastroAnimal';
import Animal from './pages/Animal';
import AlterarAnimal from './pages/AlterarAnimal';
import { AuthProvider } from './context/AuthContext'; // Importa o AuthProvider

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ComingSoon />,
  children: [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/cadastroVoluntario",
      element: <CadastroVoluntario />,
    },
    {
      path: "/voluntario",
      element: <Voluntario />,
    },
    {
      path: "/alteraVoluntario",
      element: <AlterarVoluntario />,
    },
    {
      path: "/animal",
      element: <Animal />,
    },
    {
      path: "/alteraAnimal",
      element: <AlterarAnimal />,
    },
    {
      path: "/cadastroAnimal",
      element: <CadastroAnimal />,
    },
  ]
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* - Envolvendo o RouterProvider com o AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
