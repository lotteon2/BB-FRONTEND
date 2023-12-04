import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function LoginLayout() {
  return (
    <div>
      <Header />
      <div className="w-full mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
