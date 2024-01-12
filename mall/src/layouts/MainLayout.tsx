import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { loginState, sideMenuState, wishState } from "../recoil/atom/common";
import { ConfigProvider } from "antd";
import { useMutation } from "react-query";
import { modifyStoreWishList, modifyWishList } from "../apis/member";
import { productWishState, storeWishState } from "../recoil/atom/member";
import ScrollToTop from "../components/common/ScrollToTop";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const productWishList = useRecoilValue<string[]>(productWishState);
  const resetProductWishList = useResetRecoilState(productWishState);
  const storeWishList = useRecoilValue<number[]>(storeWishState);
  const resetStoreWishList = useResetRecoilState(storeWishState);
  const setSideMenuState = useSetRecoilState<number>(sideMenuState);
  const setIsChange = useSetRecoilState<boolean>(wishState);

  const handleWishList = () => {
    if (productWishList.length !== 0) {
      productWishMutation.mutate();
    } else {
      navigate("/mypage");
      setSideMenuState(1);
    }
    if (storeWishList.length !== 0) {
      storeWishMutation.mutate();
    } else {
      navigate("/mypage");
      setSideMenuState(1);
    }
  };

  const productWishMutation = useMutation(
    ["modifyWishList"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        navigate("/mypage");
        setSideMenuState(1);
        resetProductWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        productWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  const storeWishMutation = useMutation(
    ["modifyStoreWishList"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        navigate("/mypage");
        setSideMenuState(1);
        resetStoreWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        storeWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  return (
    <div className="font-regular">
      <ScrollToTop />
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#85C031",
          },
        }}
      >
        <Header />
        {isLogin ? (
          <div className="fixed right-20 top-60 max-[1320px]:right-3 flex flex-col gap-3 z-20 bg-grayscale1 p-3 rounded-full border-2 shadow-xl z-30">
            <button onClick={() => navigate("/cart")} title="장바구니">
              <ShoppingBagIcon />
            </button>
            <button onClick={handleWishList} title="찜한 상품">
              <FavoriteIcon />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="맨위로"
            >
              <ArrowUpwardIcon />
            </button>
          </div>
        ) : (
          <div className="fixed right-20 top-60 max-[1320px]:right-3 flex flex-col gap-3 z-20 bg-grayscale1 p-3 rounded-full border-2 shadow-xl z-30">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="맨위로"
            >
              <ArrowUpwardIcon />
            </button>
          </div>
        )}

        <div className="max-w-[1320px] mx-auto">
          <Outlet />
        </div>

        <Footer />
      </ConfigProvider>
    </div>
  );
}
