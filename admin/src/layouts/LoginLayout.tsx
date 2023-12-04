import { Outlet } from "react-router";
import LoginBg from "../assets/images/loginbg.png";
export default function LoginLayout() {
  return (
    <div className="relative w-[1920px] h-screen">
      <Outlet />
      <img src={LoginBg} alt="" className="absolute bottom-0 z-0" />
    </div>
  );
}
