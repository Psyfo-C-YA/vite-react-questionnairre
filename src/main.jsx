import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SideBar from './Components/SideBar.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import Dashboard from './Components/Dashboard';
import Questionnaire from './Components/Questionnaire';
import Create from './Components/Create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'questionnaire/',
        element: <Questionnaire />,
        // loader: contactLoader,
      },
      {
        path: 'create/',
        element: <Create />,
        // loader: contactLoader,
      },
      // {
      //   path: 'contacts/:contactId/destroy',
      //   action: destroyAction,
      //   errorElement: <div>Oops! There was an error.</div>,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
