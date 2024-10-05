import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon';

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
  ]
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
);
