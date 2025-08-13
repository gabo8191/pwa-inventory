import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './components/common/Layout';
import { ConductorDashboardPage } from './routes/conductor-dashboard.page';
import { DashboardPage } from './routes/dashboard.page';
import { DespachoVentaPage } from './routes/despacho-venta.page';
import { IngresoPage } from './routes/ingreso.page';
import { LoginPage } from './routes/login.page';
import { RecepcionIngresoPage } from './routes/recepcion-ingreso.page';
import { SalidaPage } from './routes/salida.page';
import { TrasladosPage } from './routes/traslados.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'conductor-dashboard', element: <ConductorDashboardPage /> },
      { path: 'ingreso', element: <IngresoPage /> },
      { path: 'salida', element: <SalidaPage /> },
      { path: 'traslados', element: <TrasladosPage /> },
      { path: 'despacho-venta', element: <DespachoVentaPage /> },
      { path: 'recepcion-ingreso', element: <RecepcionIngresoPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
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
