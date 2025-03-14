import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from '@/pages/ErrorPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SettingPage from '@/pages/Dashboard/SettingPage';



const router = createBrowserRouter([

  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/setting",
        element: <SettingPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
