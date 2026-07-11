import {ClientLayout} from "../layouts"
import {Home} from "../pages/Client"

const routesClient = [
    {
        path: "/",
        element: <ClientLayout />,
        // children: [
        //     {
        //         index: true,
        //         element: <Home />,
        //     },
        // ],
    },
]

export default routesClient;