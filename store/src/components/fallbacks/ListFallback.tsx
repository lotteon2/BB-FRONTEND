import { Skeleton } from "antd";

export default function ListFallback() {
  return (
    <div className="flex flex-col gap-1 mt-3">
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node active style={{ width: 1580, height: 130 }}>
        <div></div>
      </Skeleton.Node>
    </div>
  );
}
