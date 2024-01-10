import { Skeleton } from "antd";

export default function MypageTableFallback() {
  return (
    <div className="w-full flex justify-center">
      <Skeleton.Node
        style={{
          width: "80vw",
          height: "55vw",
          maxWidth: "1110px",
          maxHeight: "655px",
          minWidth: "370px",
          minHeight: "432px",
          marginTop: "10px",
        }}
        active
      >
        <div></div>
      </Skeleton.Node>
    </div>
  );
}
