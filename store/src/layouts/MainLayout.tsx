import { Outlet } from "react-router";

import Header from "../components/common/Header";
import ProfileBar from "../components/common/ProfileBar";

export default function MainLayout() {
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
