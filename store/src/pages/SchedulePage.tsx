import { useState, useRef } from "react";
import { Tour, TourProps } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import SchedulerCalendar from "../components/schedule/SchedulerCalendar";

export default function SchedulePage() {
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "정기구독/픽업 내역 확인",
      description:
        "사장님들의 효율적인 스케쥴 관리를 위해 캘린더 형식으로 제작된 구독/픽업 주문 내역입니다. 월별로 구독 및 픽업 예약 정보들을 확인할 수 있고, 캘린더에 등록된 이벤트 클릭 시 해당 날짜에 대한 상세한 정보들을 확인할 수 있습니다.",
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
        <span className="text-xl font-bold">구독/픽업 관리</span>
        <SchedulerCalendar />
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
