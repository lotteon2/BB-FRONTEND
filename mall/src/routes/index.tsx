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
import OrderPage from "../pages/order/OrderPage";
import CartPage from "../pages/CartPage";
import MyPage from "../pages/MyPage";
import OrderDetailPage from "../pages/order/OrderDetailPage";
import GiftCardPage from "../pages/GiftCartPage";
import PickupNearby from "../components/pickup/PickupNearby";
import PickupRegion from "../components/pickup/PickupRegion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "", element: <MainPage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "store/detail/:storeId", element: <StoreDetailPage /> },
      { path: "subscription", element: <SubscriptionPage /> },
      { path: "pickup", element: <PickupPage /> },
      { path: "pickup/nearby", element: <PickupNearby /> },
      { path: "pickup/region", element: <PickupRegion /> },
      {
        path: "pickup/product/detail/:productId",
        element: <PickupProductDetailPage />,
      },
      { path: "order/:type", element: <OrderPage /> },
      {
        path: "order/detail/:type/:id",
        element: <OrderDetailPage />,
      },
      {
        path: "product/subscription/detail/:storeId",
        element: <SubscriptionDetailPage />,
      },
      { path: "product/:categoryId", element: <ProductByCategoryPage /> },
      { path: "product/tag/:tagId", element: <ProductByTagPage /> },
      { path: "product/detail/:productId", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "giftcard/:type/:id/:productId", element: <GiftCardPage /> },
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
