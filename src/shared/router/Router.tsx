import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Daily from '../../pages/daily/Daily';
import Statistics from '../../pages/statistics/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
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
]);

export default router;
