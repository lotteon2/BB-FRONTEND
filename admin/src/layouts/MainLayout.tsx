import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "../components/common/Header";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";
import ProfileBar from "../components/common/ProfileBar";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-[1920px] h-screen font-regular flex flex-row">
      <div className="w-[300px] bg-grayscale7 relative">
        <Header />
      </div>
      <div className="w-[1620px]">
        <ProfileBar />
        <Outlet />
      </div>
    </div>
  );
}
