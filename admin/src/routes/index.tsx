import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/common/NotFound";
import DashboardPage from "../pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <DashboardPage /> }],
  },
]);

export default router;
