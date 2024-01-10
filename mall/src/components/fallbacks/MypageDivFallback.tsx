import { Skeleton } from "antd";

export default function MypageDivFallback() {
  return (
    <div className="flex flex-row gap-3 mt-5 justify-center flex-wrap">
      <Skeleton.Node
        style={{
          width: "370px",
          height: "200px",
        }}
        active
      >
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node
        style={{
          width: "370px",
          height: "200px",
        }}
        active
      >
        <div></div>
      </Skeleton.Node>
      <Skeleton.Node
        style={{
          width: "370px",
          height: "200px",
        }}
        active
      >
        <div></div>
      </Skeleton.Node>
    </div>
  );
}
