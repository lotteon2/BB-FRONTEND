import { useState, useRef } from "react";
import QuestionList from "../components/manage/QuestionList";
import ReviewList from "../components/manage/ReviewList";
import { Tour, TourProps } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

export default function ManagePage() {
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "리뷰 관리",
      description:
        "구매자들의 구매 후기 정보들을 확인할 수 있습니다. 최신순/별점높은순/별점낮은순으로 정렬할 수 있으며 해당 리뷰 클릭 시 더 상세한 리뷰 내용을 확인할 수 있습니다.",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "문의 관리",
      description:
        "등록된 상품에 대한 질문들을 확인할 수 있습니다. 답변 상태별로 조회할 수 있으며 '답변 대기'인 문의에 대해서는 직접 답변을 남길 수 있습니다.",
      placement: "left",
      target: () => ref2.current,
    },
  ];

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-row gap-2 p-2">
      <div className="w-1/2 h-full bg-grayscale1 rounded-lg p-3" ref={ref1}>
        <ReviewList />
      </div>
      <div className="w-1/2 h-full bg-grayscale1 rounded-lg p-3" ref={ref2}>
        <QuestionList />
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
