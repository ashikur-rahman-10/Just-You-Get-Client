import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddProduct from "../Pages/AdminPage/AddProducts/AddProduct";
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
import Dashboard from "../Layouts/Dashboard";
import AdminDashBoard from "../Pages/AdminPage/AdminDashBoard/AdminDashBoard";
import NewOrders from "../Pages/AdminPage/NewOrders/NewOrders";
import ToShipped from "../Pages/AdminPage/ToShipped/ToShipped";
import DeliveredOrders from "../Pages/AdminPage/DeliveredOrders/DelivaredOrders";
import OrderDetails from "../Pages/AdminPage/OrderDetails/OrderDetails";
import ShippingLevel from "../Pages/AdminPage/ShippingLevel/ShippingLevel";
import ManageProduct from "../Pages/AdminPage/ManageProduct/ManageProduct";
import ManageStocks from "../Pages/AdminPage/ManageStocks/ManageStocks";
import SalesReport from "../Pages/AdminPage/SalesReport/SalesReport";
import UserDetails from "../Pages/AdminPage/ManageUser/UserDetails";
import ManageUsers from "../Pages/AdminPage/ManageUser/ManageUsers";

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

      // {
      //   path: "/add-product",
      //   element: (
      //     <AdminOnly>
      //       <AddProduct />
      //     </AdminOnly>
      //   ),
      // },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminOnly>
        <Dashboard />
      </AdminOnly>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminOnly>
            <AdminDashBoard />
          </AdminOnly>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminOnly>
            <AddProduct />
          </AdminOnly>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminOnly>
            <ManageProduct />
          </AdminOnly>
        ),
      },
      {
        path: "new-orders",
        element: (
          <AdminOnly>
            <NewOrders />
          </AdminOnly>
        ),
      },
      {
        path: "to-shipped",
        element: (
          <AdminOnly>
            <ToShipped />
          </AdminOnly>
        ),
      },
      {
        path: "delivered",
        element: (
          <AdminOnly>
            <DeliveredOrders />
          </AdminOnly>
        ),
      },
      {
        path: "order-details/:transactionId",
        element: (
          <AdminOnly>
            <OrderDetails />
          </AdminOnly>
        ),
      },
      {
        path: "manage-stocks",
        element: (
          <AdminOnly>
            <ManageStocks />
          </AdminOnly>
        ),
      },
      {
        path: "sells-report",
        element: (
          <AdminOnly>
            <SalesReport />
          </AdminOnly>
        ),
      },
      {
        path: `user-details/:email`,
        element: (
          <AdminOnly>
            <UserDetails />
          </AdminOnly>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminOnly>
            <ManageUsers />
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
  {
    path: "shipping-level/:transactionId",
    element: (
      <AdminOnly>
        <ShippingLevel />
      </AdminOnly>
    ),
  },
]);

export default router;
