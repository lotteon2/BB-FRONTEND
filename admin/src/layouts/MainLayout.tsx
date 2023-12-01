import { Outlet } from "react-router";
import { ConfigProvider } from "antd";

export default function MainLayout() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F4CE14",
            fontFamily: "regular",
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </div>
  );
}
