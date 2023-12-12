import { Skeleton } from "antd";

export default function ModifyMemberInfoFallback() {
  return (
    <div className="flex flex-row gap-5 mt-5 flex-wrap max-[375px]:justify-center">
      <Skeleton.Node
        active
        style={{ width: 160, height: 160, borderRadius: "50%" }}
      >
        <div></div>
      </Skeleton.Node>
      <div className="flex flex-col gap-2">
        <Skeleton.Node active style={{ width: 370, height: 40 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 370, height: 40 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 370, height: 40 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 370, height: 40 }}>
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
