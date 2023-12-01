import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StoreIcon from "@mui/icons-material/Store";
import PaidIcon from "@mui/icons-material/Paid";

export default function Header() {
  const activeStyle = {
    color: "#F4CE14",
  };

  return (
    <div className="mt-10">
      <p className="text-center logo text-primary1 text-5xl">Blooming Blooms</p>
      <ul className="mt-10 ml-8 flex flex-col text-3xl gap-10 text-grayscale1">
        <li className="w-[90%]">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/"
          >
            <SpaceDashboardIcon sx={{ fontSize: 40, marginRight: 2 }} />
            대시보드
          </NavLink>
        </li>
        <li className="w-[90%]">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/store"
          >
            <StoreIcon sx={{ fontSize: 40, marginRight: 2 }} />
            가게 관리
          </NavLink>
        </li>
        <li className="w-[90%]">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/settlement"
          >
            <PaidIcon sx={{ fontSize: 40, marginRight: 2 }} />
            정산 내역
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
