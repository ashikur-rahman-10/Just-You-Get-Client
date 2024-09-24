import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddProduct from "../Pages/AdminPages/AddProducts/AddProduct";
import AdminOnly from "./AdminOnly";
import Home from "../Pages/Home/Home/Home";
import Categories from "../Pages/Categories/Categories";
import AllProducts from "../Pages/AllProducts/AllProducts";
import PrivateRoute from "./PrivateRoute";
import Cart from "../Pages/Cart/Cart";
import OrderConfirmation from "../Pages/Cart/OrderConfirmation";
import Profile from "../Pages/Profile/Profile";
import PaymentsSuccess from "../Pages/Payments/PaymentsSuccess";
import OrderHistory from "../Pages/OrderHistory/OrderHistory";
import Invoice from "../Pages/OrderHistory/Invoice";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

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
      { path: "/categories", element: <Categories /> },
      { path: "/all-products", element: <AllProducts /> },
      { path: "/categories/:category", element: <CategoryProducts /> },
      { path: "/products/:id", element: <ProductDetails /> },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-confirmation",
        element: (
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/:name",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/success-payment/:trans_id",
        element: (
          <PrivateRoute>
            <PaymentsSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-history",
        element: (
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        ),
      },

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
  {
    path: "/invoice/:transactionId",
    element: (
      <PrivateRoute>
        <Invoice />
      </PrivateRoute>
    ),
  },
]);

export default router;
