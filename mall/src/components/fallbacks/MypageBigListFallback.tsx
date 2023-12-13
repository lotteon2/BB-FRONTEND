import { Skeleton } from "antd";

export default function MypageBigListFallback() {
  return (
    <div className="flex flex-row gap-3 mt-5 text-center flex-wrap">
      <div className="flex flex-col text-left mx-auto">
        <Skeleton.Node
          style={{
            width: "23vw",
            height: "23vw",
            minWidth: 180,
            minHeight: 180,
            maxWidth: 320,
            maxHeight: 320,
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 mt-2">
          <Skeleton.Input
            active
            style={{
              width: "8vw",
              minWidth: "100px",
              maxWidth: "150px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "15vw",
              minWidth: "150px",
              maxWidth: "250px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "20vw",
              minWidth: "180px",
              maxWidth: "300px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              minWidth: "100px",
              maxWidth: "200px",
              height: 30,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col text-left mx-auto">
        <Skeleton.Node
          style={{
            width: "23vw",
            height: "23vw",
            minWidth: 180,
            minHeight: 180,
            maxWidth: 320,
            maxHeight: 320,
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 mt-2">
          <Skeleton.Input
            active
            style={{
              width: "8vw",
              minWidth: "100px",
              maxWidth: "150px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "15vw",
              minWidth: "150px",
              maxWidth: "250px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "20vw",
              minWidth: "180px",
              maxWidth: "300px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              minWidth: "100px",
              maxWidth: "200px",
              height: 30,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col text-left mx-auto">
        <Skeleton.Node
          style={{
            width: "23vw",
            height: "23vw",
            minWidth: 180,
            minHeight: 180,
            maxWidth: 320,
            maxHeight: 320,
          }}
          active
        >
          <div></div>
        </Skeleton.Node>
        <div className="flex flex-col gap-1 mt-2">
          <Skeleton.Input
            active
            style={{
              width: "8vw",
              minWidth: "100px",
              maxWidth: "150px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "15vw",
              minWidth: "150px",
              maxWidth: "250px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "20vw",
              minWidth: "180px",
              maxWidth: "300px",
              height: 30,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "10vw",
              minWidth: "100px",
              maxWidth: "200px",
              height: 30,
            }}
          />
        </div>
      </div>
    </div>
  );
}
