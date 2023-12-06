import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { sideMenuState } from "../recoil/atom/common";
import { ConfigProvider } from "antd";
import { useMutation } from "react-query";
import { modifyStoreWishList, modifyWishList } from "../apis/member";
import { productWishState, storeWishState } from "../recoil/atom/member";
import { FailToast } from "../components/common/toast/FailToast";

export default function MainLayout() {
  const navigate = useNavigate();
  const productWishList = useRecoilValue<string[]>(productWishState);
  const resetProductWishList = useResetRecoilState(productWishState);
  const storeWishList = useRecoilValue<number[]>(storeWishState);
  const resetStoreWishList = useResetRecoilState(storeWishState);
  const setSideMenuState = useSetRecoilState<number>(sideMenuState);
  const location = useLocation();

  const handleRefresh = () => {
    if (productWishList.length !== 0) {
      productWishMutation.mutate();
    }
    if (storeWishList.length !== 0) {
      storeWishMutation.mutate();
    }
  };

  const productWishMutation = useMutation(
    ["modifyWishList"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        resetProductWishList();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const storeWishMutation = useMutation(
    ["modifyStoreWishList"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        resetStoreWishList();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", handleRefresh);
    })();

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="font-regular">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#85C031",
          },
        }}
      >
        <Header />
        <div className="fixed right-20 top-60 max-[1320px]:right-3 flex flex-col gap-3 z-20 bg-grayscale1 p-3 rounded-full border-2 shadow-xl">
          <button onClick={() => navigate("/cart")} title="장바구니">
            <ShoppingBagIcon />
          </button>
          <button
            onClick={() => {
              navigate("/mypage");
              setSideMenuState(1);
            }}
            title="찜한 상품"
          >
            <FavoriteIcon />
          </button>
          <button
            onClick={() => {
              navigate("/mypage");
              setSideMenuState(2);
            }}
            title="최근 본 상품"
          >
            <HistoryIcon />
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="맨위로"
          >
            <ArrowUpwardIcon />
          </button>
        </div>

        <div className="max-w-[1320px] mx-auto">
          <Outlet />
        </div>

        <Footer />
      </ConfigProvider>
    </div>
  );
}
