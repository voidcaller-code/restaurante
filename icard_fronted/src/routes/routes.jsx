import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { Error404 } from "../pages";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
