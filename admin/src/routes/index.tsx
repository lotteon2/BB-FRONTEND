import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/common/NotFound";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import LoginLayout from "../layouts/LoginLayout";
import StorePage from "../pages/StorePage";
import SettlementPage from "../pages/SettlementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <DashboardPage /> }],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <LoginPage /> }],
  },
  {
    path: "/store",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <StorePage /> }],
  },
  {
    path: "/settlement",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <SettlementPage /> }],
  },
]);

export default router;
