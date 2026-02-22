import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Daily from '../../pages/daily/Daily';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/daily',
    element: <Daily />,
  },
]);

export default router;
