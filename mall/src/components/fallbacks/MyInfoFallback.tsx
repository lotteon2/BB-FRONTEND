import { Skeleton } from "antd";

export default function MyInfoFallback() {
  return (
    <div className="w-full mx-auto flex flex-row gap-5 flex-wrap justify-between max-[660px]:justify-center">
      <div className="flex flex-row gap-3">
        <Skeleton.Node
          active
          style={{ width: 112, height: 112, borderRadius: "50%" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 240, height: 112 }}>
          <div></div>
        </Skeleton.Node>
      </div>
      <div className="flex flex-row gap-3 text-[1rem] my-auto">
        <Skeleton.Node
          active
          style={{
            width: 265,
            height: 56,
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
