import { Skeleton } from "antd";

export default function QuarterDiv() {
  return (
    <Skeleton.Node
      active
      style={{ width: "805px", height: "448px", borderRadius: "8px" }}
    >
      <div></div>
    </Skeleton.Node>
  );
}
