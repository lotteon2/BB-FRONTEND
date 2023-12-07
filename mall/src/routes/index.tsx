import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/common/NotFound";
import MainPage from "../pages/MainPage";
import LoginLayout from "../layouts/LoginLayout";
import LoginPage from "../pages/LoginPage";
import KakaoLoginRedirect from "../components/auth/KakaoLoginRedirect";
import PickupPage from "../pages/PickupPage";
import StoreDetailPage from "../pages/StoreDetailPage";
import SubscriptionDetailPage from "../pages/subscription/SubscriptionDetailPage";
import ProductByCategoryPage from "../pages/product/ProductByCategoryPage";
import ProductByTagPage from "../pages/product/ProductByTagPage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";
import PickupProductDetailPage from "../pages/product/PickupProductDetailPage";
import PickupOrderPage from "../pages/order/PickupOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "", element: <MainPage /> },
      { path: "store/detail/:storeId", element: <StoreDetailPage /> },
      { path: "subscription", element: <SubscriptionPage /> },
      { path: "pickup", element: <PickupPage /> },
      {
        path: "pickup/product/detail/:productId",
        element: <PickupProductDetailPage />,
      },
      { path: "pickup/order", element: <PickupOrderPage /> },
      {
        path: "product/subscription/detail/:storeId",
        element: <SubscriptionDetailPage />,
      },
      { path: "product/:categoryId", element: <ProductByCategoryPage /> },
      { path: "product/tag/:tagId", element: <ProductByTagPage /> },
      { path: "product/detail/:productId", element: <ProductDetailPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "", element: <LoginPage /> },
      { path: "oauth", element: <KakaoLoginRedirect /> },
    ],
  },
]);

export default router;
