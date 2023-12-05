import { Select, Skeleton } from "antd";

export default function SettlementTableFallback() {
  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg">
        <div className="flex flex-row gap-3 p-3 justify-end">
          <Select placeholder="년 선택" style={{ width: 100 }} allowClear />
          <Select placeholder="월 선택" style={{ width: 100 }} allowClear />
        </div>
        <div className="h-[770px] w-[1580px] mx-auto">
          <div className="flex flex-col gap-1 mt-3">
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node active style={{ width: 1580, height: 70 }}>
              <div></div>
            </Skeleton.Node>
          </div>
        </div>
      </div>
    </div>
  );
}
