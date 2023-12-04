import { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../recoil/atom/common";
import { Button, Empty, Tour, TourProps } from "antd";
import { useNavigate } from "react-router";
import WeeklySaleGraph from "../components/dashboard/WeeklySaleGraph";
import BestProductsGraph from "../components/dashboard/BestProductsGraph";
import DashboardStockGraph from "../components/dashboard/DashboardStockGraph";
import { QuestionCircleFilled } from "@ant-design/icons";

export default function DashboardPage() {
  const navigate = useNavigate();
  const storeId = useRecoilValue<number | null>(storeIdState);
  const [open, setOpen] = useState<boolean>(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "주간 매출액 그래프",
      description:
        "최근 7일간의 매출액을 확인할 수 있어요. 그래프 위에 마우스를 가져다대면 좀 더 정확한 금액 정보를 확인할 수 있고, 우측 상단 버튼을 통해 그래프 정보를 이미지나 csv 파일로 다운로드받을 수 있어요.",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "베스트셀러 TOP10 그래프",
      description:
        "현재 가게에서 가장 잘 팔리는 상품들을의 매출 현황을 알 수 있어요. 그래프 위에 마우스를 가져다대면 좀 더 정확한 개수 정보를 확인할 수 있고, 하단 상품명 목록에서 제외할 상품을 선택할 수 있어요. 우측 상단 버튼을 통해 그래프 정보를 이미지나 csv 파일로 다운로드받을 수 있어요.",
      placement: "left",
      target: () => ref2.current,
    },
    {
      title: "재고량 그래프",
      description:
        "남아있는 재고 개수를 확인할 수 있어요. 그래프 위에 마우스를 가져다대면 좀 더 정확한 개수 정보를 확인할 수 있고, 하단 상품명 목록에서 제외할 상품을 선택할 수 있어요. 우측 상단 버튼을 통해 그래프 정보를 이미지나 csv 파일로 다운로드받을 수 있어요.",
      placement: "top",
      target: () => ref3.current,
    },
  ];

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
            <div
              className="w-[805px] h-[436px] bg-grayscale1 rounded-lg"
              ref={ref1}
            >
              <WeeklySaleGraph />
            </div>
            <div
              className="w-[805px] h-[436px] bg-grayscale1 rounded-lg"
              ref={ref2}
            >
              <BestProductsGraph />
            </div>
          </div>
          <div
            className="w-[1605px] h-[436px] bg-grayscale1 rounded-lg"
            ref={ref3}
          >
            <DashboardStockGraph />
          </div>
          <button
            className="absolute bottom-1 right-1"
            onClick={() => setOpen(true)}
          >
            <QuestionCircleFilled style={{ fontSize: 20 }} />
          </button>

          <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </div>
      )}
    </div>
  );
}
