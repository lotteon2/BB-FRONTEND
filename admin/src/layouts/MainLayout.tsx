import { Outlet, useNavigate } from "react-router";

import Header from "../components/common/Header";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);

  if (!isLogin) {
    navigate("/login");
  }

  return (
    <div className="w-[1920px] h-screen font-regular flex flex-row">
      <div className="w-[300px] bg-grayscale7 relative">
        <Header />
      </div>
      <Outlet />
    </div>
  );
}
