import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Error from './components/Error/Error';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/tests',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: '/tests/:userId',
        element: <Dashboard />
      },
      {
        path: '/tests/:userId?mock',
        element: <Dashboard />
      },
    ]
  },
]);

export default router;