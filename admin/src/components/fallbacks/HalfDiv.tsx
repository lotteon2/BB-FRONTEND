import { Skeleton } from "antd";

export default function HalfDiv() {
  return (
    <Skeleton.Node
      active
      style={{ width: "1605px", height: "436px", borderRadius: "8px" }}
    >
      <div></div>
    </Skeleton.Node>
  );
}
