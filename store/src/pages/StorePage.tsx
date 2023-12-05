import { QuestionCircleFilled } from "@ant-design/icons";
import { Tour, TourProps } from "antd";
import { useState, useRef } from "react";
import StoreInfo from "../components/store/StoreInfo";
import SubscriptionInfo from "../components/store/SubscriptionInfo";
import CouponTable from "../components/store/CouponTable";

export default function StorePage() {
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "가게 정보 관리",
      description:
        "'가게정보 등록/가게정보 관리' 버튼을 통해 가게를 등록하거나 수정할 수 있습니다.",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "구독 상품 관리",
      description:
        "'구독상품 관리' 버튼을 통해 정기구독 상품을 등록할 수 있습니다. 가게마다 등록할 수 있는 구독 상품은 하나이며, 매달 한번씩 발송되어야 하는 상품입니다. 구독 주문 내역은 '구독/픽업'관리 탭에서 확인할 수 있습니다.",
      placement: "right",
      target: () => ref2.current,
    },
    {
      title: "쿠폰 관리",
      description:
        "'쿠폰 등록' 버튼을 통해 쿠폰을 등록할 수 있습니다. 등록 시 쿠폰이름, 발행 개수, 할인 금액, 최소 주문금액, 이벤트 기간 등을 설정할 수 있습니다. '수정' 버튼을 통해 쿠폰 정보를 수정할 수 있습니다. 단, 쿠폰 수정은 아직 시작되지 않은 쿠폰에 대해서만 가능합니다. 'X' 버튼을 통해 등록된 쿠폰을 삭제할 수 있습니다. 단, 시작일 이전, 종료일 이후의 쿠폰만 삭제할 수 있습니다.",
      placement: "left",
      target: () => ref3.current,
    },
  ];

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2 relative">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <div
            className="w-[550px] h-[436px] bg-grayscale1 rounded-lg"
            ref={ref1}
          >
            <StoreInfo />
          </div>
          <div
            className="w-[550px] h-[436px] bg-grayscale1 rounded-lg"
            ref={ref2}
          >
            <SubscriptionInfo />
          </div>
        </div>
        <div
          className="w-[1200px] h-[881px] bg-grayscale1 rounded-lg"
          ref={ref3}
        >
          <CouponTable />
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
