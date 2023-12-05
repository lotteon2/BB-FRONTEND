import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/common/NotFound";
import LoginLayout from "../layouts/LoginLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import StorePage from "../pages/StorePage";
import ProductPage from "../pages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "", element: <DashboardPage /> },
      { path: "store", element: <StorePage /> },
      { path: "product", element: <ProductPage /> },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
