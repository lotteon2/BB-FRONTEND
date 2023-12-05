import { Skeleton } from "antd";

export default function QuarterDiv() {
  return (
    <Skeleton.Node
      active
      style={{ width: "798px", height: "436px", borderRadius: "8px" }}
    >
      <div></div>
    </Skeleton.Node>
  );
}
