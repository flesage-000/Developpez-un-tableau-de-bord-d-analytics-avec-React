import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Error from './components/Error/Error';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: '/:userId',
        element: <Dashboard />
      },
    ]
  },
]);

export default router;