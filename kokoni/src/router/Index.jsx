export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
            index: true,
            Component: Home
            },
            {
            path: "/register",
            Component: Register
            },
            {
            path:"/login",
            Component: Login
            }
            ]
    }
])