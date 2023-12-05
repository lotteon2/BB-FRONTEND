import { Select, Skeleton } from "antd";

export default function QuestionTableFallback() {
  return (
    <div className="relative">
      <div className="text-xl font-bold text-left">문의 관리</div>
      <span className="absolute right-0 top-0 text-left">
        <Select
          placeholder="답변 상태"
          options={[
            {
              value: true,
              label: "답변완료",
            },
            {
              value: false,
              label: "답변대기",
            },
          ]}
          style={{ width: 120 }}
        />
      </span>
      <div className="flex flex-col gap-1 text-center mt-3">
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 70 }}>
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
