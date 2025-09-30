import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalLoader } from './components/common/GlobalLoader';
import { GlobalOfflineBlocker } from './components/common/GlobalOfflineBlocker';
import { Layout } from './components/common/Layout';
import { DriverRoutes } from './routes/driver';
import { DriverDashboardPage } from './routes/driver/dashboard.page';
import { DespachoVentaPage } from './routes/driver/dispatch.page';
import { RecepcionIngresoPage } from './routes/driver/recept.page';
import { LoginPage } from './routes/login.page';
import { MachineOperatorRoutes } from './routes/machine-operator';
import { MachineOperatorDashboardPage } from './routes/machine-operator/dashboard.page';
import { ProductionPage } from './routes/machine-operator/production.page';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { YardOperatorRoutes } from './routes/yard-operator';
import { YardOperatorDashboardPage } from './routes/yard-operator/dashboard.page';
import { IngresoPage } from './routes/yard-operator/entry.page';
import { SalidaPage } from './routes/yard-operator/exit.page';
import { TrasladosPage } from './routes/yard-operator/movements.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'driver',
            element: <DriverRoutes />,
            children: [
              { path: 'dashboard', element: <DriverDashboardPage /> },
              { path: 'reception', element: <RecepcionIngresoPage /> },
              { path: 'dispatch', element: <DespachoVentaPage /> },
              { path: 'movements', element: <TrasladosPage /> },
            ],
          },
          {
            path: 'yard-operator',
            element: <YardOperatorRoutes />,
            children: [
              { path: 'dashboard', element: <YardOperatorDashboardPage /> },
              { path: 'entry', element: <IngresoPage /> },
              { path: 'exit', element: <SalidaPage /> },
              { path: 'movements', element: <TrasladosPage /> },
            ],
          },
          {
            path: 'machine-operator',
            element: <MachineOperatorRoutes />,
            children: [
              { path: 'dashboard', element: <MachineOperatorDashboardPage /> },
              { path: 'production', element: <ProductionPage /> },
              { path: 'movements', element: <TrasladosPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalLoader />
      <GlobalOfflineBlocker />
      <ToastContainer
        position='top-right'
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default App;
