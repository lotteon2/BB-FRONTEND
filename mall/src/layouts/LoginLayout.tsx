import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function LoginLayout() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="w-full mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
