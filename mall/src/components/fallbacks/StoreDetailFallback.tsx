import { Skeleton } from "antd";

export default function StoreDetailFallback() {
  return (
    <div className="pb-10 flex flex-row gap-3 flex-wrap justify-center">
      <Skeleton.Node
        active
        style={{
          width: "20vw",
          minWidth: "300px",
          maxWidth: "300px",
          height: "20vw",
          minHeight: "300px",
          maxHeight: "300px",
        }}
      >
        <div></div>
      </Skeleton.Node>
      <div className="flex flex-col gap-2 w-[70vw] max-w-[1000px] relative">
        <Skeleton.Node
          active
          style={{ width: "30%", height: 60, minWidth: "300px" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{ width: "60%", height: 35, minWidth: "300px" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{ width: "40%", height: 35, minWidth: "300px" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{ width: "100%", height: 80, minWidth: "300px" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{
            width: "40%",
            height: 60,
            display: "flex",
            position: "absolute",
            right: 0,
            minWidth: "250px",
          }}
        >
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
