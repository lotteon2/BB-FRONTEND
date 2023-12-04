import { useRecoilValue } from "recoil";
import { storeIdState } from "../recoil/atom/common";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router";
import WeeklySaleGraph from "../components/dashboard/WeeklySaleGraph";
import BestProductsGraph from "../components/dashboard/BestProductsGraph";
import DashboardStockGraph from "../components/dashboard/DashboardStockGraph";

export default function DashboardPage() {
  const navigate = useNavigate();
  const storeId = useRecoilValue<number | null>(storeIdState);

  return (
    <div>
      {storeId === null ? (
        <div className="w-full h-full mt-80">
          <Empty description="등록된 가게정보가 없습니다.">
            <Button onClick={() => navigate("/store")}>
              가게 등록하러 가기
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2">
          <div className="flex flex-row gap-2">
            <div className="w-[805px] h-[436px] bg-grayscale1 rounded-lg">
              <WeeklySaleGraph />
            </div>
            <div className="w-[805px] h-[436px] bg-grayscale1 rounded-lg">
              <BestProductsGraph />
            </div>
          </div>
          <div className="w-[1605px] h-[436px] bg-grayscale1 rounded-lg">
            <DashboardStockGraph />
          </div>
        </div>
      )}
    </div>
  );
}
