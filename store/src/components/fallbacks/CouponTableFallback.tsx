import { Button, Skeleton } from "antd";

export default function CouponTableFallback() {
  return (
    <div className="w-full h-full p-3 relative">
      <span className="text-xl font-bold">쿠폰 관리</span>
      <Button className="absolute top-3 right-3" type="primary">
        쿠폰 등록
      </Button>
      <div className="flex flex-col gap-1 mt-3">
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 1030, height: 50 }}>
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
