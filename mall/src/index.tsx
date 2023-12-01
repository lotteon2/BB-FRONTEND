import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

// React-Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Recoil
import { RecoilRoot } from "recoil";

import router from "./routes";
import Loading from "./components/common/Loading";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#85C031",
        fontFamily: "regular",
      },
    }}
  >
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </RecoilRoot>
  </ConfigProvider>
);
