import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddProduct from "../Pages/AdminPages/AddProducts/AddProduct";
import AdminOnly from "./AdminOnly";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/add-product",
        element: (
          <AdminOnly>
            <AddProduct />
          </AdminOnly>
        ),
      },
    ],
  },
]);

export default router;
