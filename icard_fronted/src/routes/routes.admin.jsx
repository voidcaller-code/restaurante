import { AdminLayout } from '../layouts'
import {
  LoginAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
  OrdersAdmin,
  TableDetailsAdmin,
  PaymentsHistory,
} from '../pages/Admin'
import { Error404 } from '../pages'

const routesAdmin = [
  {
    path: '/admin/login',
    element: <LoginAdmin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <OrdersAdmin />,
      },
      {
        path: 'users',
        element: <UsersAdmin />,
      },
      {
        path: 'categories',
        element: <CategoriesAdmin />,
      },
      {
        path: 'products',
        element: <ProductAdmin />,
      },
      {
        path: 'tables',
        element: <TablesAdmin />,
      },
      {
        path: 'tables/:id',
        element: <TableDetailsAdmin />,
      },
      {
        path: 'payments-history',
        element: <PaymentsHistory />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]

export default routesAdmin