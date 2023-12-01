import { Outlet } from "react-router";
import { ConfigProvider } from "antd";

export default function MainLayout() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#85C031",
            fontFamily: "regular",
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </div>
  );
}
