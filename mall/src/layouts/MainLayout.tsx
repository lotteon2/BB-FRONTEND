import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { sideMenuState } from "../recoil/atom/common";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);

  const setSideMenuState = useSetRecoilState<number>(sideMenuState);

  if (!isLogin) {
    navigate("/login");
  }

  return (
    <div className="font-regular">
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
    </div>
  );
}
