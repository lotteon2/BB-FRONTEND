import { Skeleton } from "antd";

export default function WholeDiv() {
  return (
    <Skeleton.Node
      active
      style={{ width: "1604px", height: "825px", borderRadius: "8px" }}
    >
      <div></div>
    </Skeleton.Node>
  );
}
