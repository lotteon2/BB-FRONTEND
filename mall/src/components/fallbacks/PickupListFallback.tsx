import { Skeleton } from "antd";

export default function PickupListFallback() {
  return (
    <div>
      <div className="px-[2vw] my-1 flex flex-row gap-1">
        <Skeleton.Node
          style={{
            width: "12vw",
            height: "12vw",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 justify-center">
          <Skeleton.Input
            active
            style={{
              width: "25vw",
              height: 30,
              minWidth: "150px",
              maxWidth: "300px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "32vw",
              height: 30,
              minWidth: "220px",
              maxWidth: "430px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              height: 30,
              minWidth: "100px",
              maxWidth: "250px",
            }}
          />
        </div>
      </div>
      <div className="px-[2vw] my-1 flex flex-row gap-1">
        <Skeleton.Node
          style={{
            width: "12vw",
            height: "12vw",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 justify-center">
          <Skeleton.Input
            active
            style={{
              width: "25vw",
              height: 30,
              minWidth: "150px",
              maxWidth: "300px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "32vw",
              height: 30,
              minWidth: "220px",
              maxWidth: "430px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              height: 30,
              minWidth: "100px",
              maxWidth: "250px",
            }}
          />
        </div>
      </div>
      <div className="px-[2vw] my-1 flex flex-row gap-1">
        <Skeleton.Node
          style={{
            width: "12vw",
            height: "12vw",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 justify-center">
          <Skeleton.Input
            active
            style={{
              width: "25vw",
              height: 30,
              minWidth: "150px",
              maxWidth: "300px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "32vw",
              height: 30,
              minWidth: "220px",
              maxWidth: "430px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              height: 30,
              minWidth: "100px",
              maxWidth: "250px",
            }}
          />
        </div>
      </div>
      <div className="px-[2vw] my-1 flex flex-row gap-1">
        <Skeleton.Node
          style={{
            width: "12vw",
            height: "12vw",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 justify-center">
          <Skeleton.Input
            active
            style={{
              width: "25vw",
              height: 30,
              minWidth: "150px",
              maxWidth: "300px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "32vw",
              height: 30,
              minWidth: "220px",
              maxWidth: "430px",
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              height: 30,
              minWidth: "100px",
              maxWidth: "250px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
