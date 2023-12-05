import { QuestionCircleFilled } from "@ant-design/icons";
import { Tour, TourProps } from "antd";
import { useState, useRef } from "react";
import StockGraph from "../components/stock/StockGraph";

export default function StockPage() {
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "재고 관리",
      description:
        "상품에 등록된 꽃 종류에 따라 현재 잔여량을 확인할 수 있습니다. 재고는 상품 주문 시 자동으로 차감되며, 50개 미만일 경우 BB에서 알림을 전송해주어 손쉬운 재고관리가 가능합니다. '재고 수정' 버튼을 통해 재고 정보를 수정할 수 있습니다.",
      placement: "center",
      target: () => ref1.current,
    },
  ];

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2">
      <div
        className="w-full h-full bg-grayscale1 rounded-lg p-3 relative"
        ref={ref1}
      >
        <StockGraph />
      </div>
      <button
        className="absolute bottom-1 right-1"
        onClick={() => setOpen(true)}
      >
        <QuestionCircleFilled style={{ fontSize: 20 }} />
      </button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}
