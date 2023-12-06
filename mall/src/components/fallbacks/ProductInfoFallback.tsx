import { Skeleton } from "antd";

export default function ProductInfoFallback() {
  return (
    <div className="w-full flex flex-row gap-10 flex-wrap justify-center">
      <Skeleton.Node
        active
        style={{
          width: "33vw",
          maxWidth: "440px",
          minWidth: "370px",
          height: "33vw",
          maxHeight: "440px",
          minHeight: "370px",
        }}
      >
        <div></div>
      </Skeleton.Node>
      <div className="flex flex-col gap-2 w-1/2 max-w-[800px] min-w-[370px]">
        <Skeleton.Node
          active
          style={{ width: "20vw", height: "70px", minWidth: "200px" }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{
            width: "40vw",
            height: "50px",
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <div></div>
        </Skeleton.Node>
        <div className="border-[1px] border-grayscale3 my-3"></div>
        <Skeleton.Node
          active
          style={{
            width: "30vw",
            height: "30px",
            minWidth: "250px",
            maxWidth: "400px",
          }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{
            width: "30vw",
            height: "30px",
            minWidth: "250px",
            maxWidth: "400px",
          }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{
            width: "30vw",
            height: "30px",
            minWidth: "250px",
            maxWidth: "400px",
          }}
        >
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node
          active
          style={{
            width: "40vw",
            height: "100px",
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-row gap-5 w-full">
          <Skeleton.Node
            active
            style={{
              width: "20vw",
              height: "80px",
              minWidth: "150px",
              maxWidth: "300px",
            }}
          >
            <div></div>
          </Skeleton.Node>
          <Skeleton.Node
            active
            style={{
              width: "20vw",
              height: "80px",
              minWidth: "150px",
              maxWidth: "300px",
            }}
          >
            <div></div>
          </Skeleton.Node>
        </div>
      </div>
    </div>
  );
}
