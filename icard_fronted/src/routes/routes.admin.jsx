import { AdminLayout } from '../layouts'
import { LoginAdmin } from '../pages/Admin'
import { Error404 } from '../pages'

export const routesAdmin = [
  {
    path: '/admin/login',
    element: <LoginAdmin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    // children: [
    //   {
    //     index: true,
    //     element: <h2>Dashboard administrador</h2>,
    //   },
    //   {
    //     path: '*',
    //     element: <Error404 />,
    //   },
    // ],
  },
]

// const routesAdmin = [
//   {
//     path: "/admin",
//     layout: AdminLayout,
//     component: LoginAdmin,
//   },
// ];

export default routesAdmin;
