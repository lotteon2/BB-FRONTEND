import { Skeleton } from "antd";

export default function SquareFallback() {
  return (
    <Skeleton.Node
      style={{
        width: "48vw",
        height: "55vw",
        maxWidth: "655px",
        maxHeight: "655px",
        minWidth: "370px",
        minHeight: "432px",
        margin: "auto",
      }}
      active
    >
      <div></div>
    </Skeleton.Node>
  );
}
