import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

import './assets/styles/reset.css';
import './assets/styles/reset-personnal.css';
import './index.css';

console.log("isProd?", process.env.REACT_APP_ENV_DATA);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={Router} />
  </React.StrictMode>
);