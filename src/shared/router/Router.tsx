import { createBrowserRouter, Navigate } from 'react-router-dom';
import Test from '../../pages/Test';
import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import Signup from '../../pages/signup/Signup';
import Daily from '../../pages/daily/Daily';
import Statistics from '../../pages/statistics/Statistics';
import Write from '../../pages/write/Write';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/daily',
    element: <Daily />,
  },
  {
    path: '/statistics',
    element: <Statistics />,
  },
  {
    path: '/write',
    element: <Write />,
  },
]);

export default router;
