import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/:userId',
        element: <Dashboard />
      },
    ]
  },
]);

export default router;