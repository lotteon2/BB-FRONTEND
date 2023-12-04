import { Button, Skeleton } from "antd";

export default function StoreInfoFallback() {
  return (
    <div className="w-full h-full p-3 relative">
      <span className="text-xl font-bold">가게정보 관리</span>
      <Button className="absolute top-3 right-3" type="primary">
        가게정보 수정
      </Button>
      <div className="flex flex-row gap-3 mt-2">
        <Skeleton.Node active style={{ width: 200, height: 200 }}>
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-3 text-[1.2rem]">
          <Skeleton.Node active style={{ width: 350, height: 50 }}>
            <div></div>
          </Skeleton.Node>
          <Skeleton.Node active style={{ width: 450, height: 35 }}>
            <div></div>
          </Skeleton.Node>
          <Skeleton.Node active style={{ width: 250, height: 35 }}>
            <div></div>
          </Skeleton.Node>
          <Skeleton.Node active style={{ width: 300, height: 35 }}>
            <div></div>
          </Skeleton.Node>
        </div>
      </div>
      <div className="mt-2">
        <Skeleton.Node active style={{ width: 780, height: 150 }}>
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
