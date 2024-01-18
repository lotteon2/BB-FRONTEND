import { Select, Tour, TourProps } from "antd";
import { useState, useRef } from "react";
import { deliveryStatusOptions } from "../recoil/common/options";
import OrderTable from "../components/order/OrderTable";
import { QuestionCircleFilled } from "@ant-design/icons";
export default function OrderPage() {
  const [orderState, setOrderState] = useState<string>();
  const handleOrderState = (value: string) => {
    setOrderState(value);
  };

  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "배송주문 내역",
      description:
        "배송 주문에 대한 정보들을 확인할 수 있습니다. 테이블 클릭 시 클릭한 주문에 대한 상세 정보들을 조회할 수 있고, 배송 여부에 따라 주문 상태를 변경할 수 있습니다.",
      placement: "center",
      target: () => ref1.current,
    },
    {
      title: "조회 옵션",
      description: "주문 상태에 따라 주문 정보들을 조회할 수 있습니다.",
      placement: "left",
      target: () => ref2.current,
    },
  ];
  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg p-3 relative">
        <span className="text-xl font-bold">배송주문 관리</span>
        <div className="flex flex-row gap-2 absolute top-3 right-3" ref={ref2}>
          <Select
            style={{ width: 100 }}
            onChange={handleOrderState}
            placeholder="주문 상태"
            options={deliveryStatusOptions}
            value={orderState}
          />
        </div>
        <div ref={ref1} className="mt-3">
          <OrderTable status={orderState} />
        </div>
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
