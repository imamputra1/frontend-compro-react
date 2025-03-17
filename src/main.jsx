import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from '@/pages/ErrorPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SettingPage from '@/pages/Dashboard/SettingPage';
import DataFetching from '@/pages/Dashboard/DataFetching';
import { Toaster } from "@/components/ui/sonner"
import { Authprovider } from '@/components/Provider/AuthProvider';
import { ProtectedRoute } from '@/components/Route/ProtectedRoute';
import { NoAuthRoute } from '@/components/Route/NoAuthRoute';



const router = createBrowserRouter([

  {
    path: '/',
    element: <Authprovider />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NoAuthRoute><LoginPage /></NoAuthRoute> ,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute>
                  <DashboardLayout />
        </ProtectedRoute>,
        children: [
          {
            path: "/dashboard/setting",
            element: <SettingPage />
          },
          {
            path: "/dashboard/DataFetching",
            element: <DataFetching  />
          }
        ],
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
