import { Outlet } from "react-router";
import LoginBg from "../assets/images/loginbg.png";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginLayout() {
  const isLogin = useRecoilValue<boolean>(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="relative w-[1920px] h-screen">
      <Outlet />
      <img src={LoginBg} alt="" className="absolute bottom-0 z-0" />
    </div>
  );
}
