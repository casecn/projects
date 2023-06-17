import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Things from "./routes/things"
import Login from './components/login';
import Register from './components/Register';

const router = createBrowserRouter ([
  {
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
  children: [
    // {
    //   index: true,
    //   element: <Home />,
    // },
    {
      path: "/things",
      element: <Things />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
