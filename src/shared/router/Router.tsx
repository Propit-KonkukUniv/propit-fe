import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';

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
]);

export default router;
