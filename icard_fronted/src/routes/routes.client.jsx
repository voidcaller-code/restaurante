import { ClientLayout, BasicLayout } from '../layouts'
import {
  SelectTable,
  Categories,
  Products,
  Cart,
  OrdersHistory,
} from '../pages/Client'

const routesClient = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <SelectTable />,
      },
      {
        path: 'client/:tableNumber',
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Categories />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          {
            path: 'orders',
            element: <OrdersHistory />,
          },
          {
            path: ':idCategory',
            element: <Products />,
          },
        ],
      },
    ],
  },
]

export default routesClient