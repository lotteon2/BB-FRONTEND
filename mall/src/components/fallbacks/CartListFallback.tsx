import { Checkbox, Button, Skeleton } from "antd";

export default function CartListFallback() {
  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div className="flex flex-row gap-2">
            <div>
              <Checkbox>전체 선택</Checkbox>
            </div>
            <Button size="small">선택 상품 삭제</Button>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <Skeleton.Node
              active
              style={{
                width: "45vw",
                maxWidth: "900px",
                minWidth: "370px",
                height: "200px",
              }}
            >
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node
              active
              style={{
                width: "45vw",
                maxWidth: "900px",
                minWidth: "370px",
                height: "200px",
              }}
            >
              <div></div>
            </Skeleton.Node>
            <Skeleton.Node
              active
              style={{
                width: "45vw",
                maxWidth: "900px",
                minWidth: "370px",
                height: "200px",
              }}
            >
              <div></div>
            </Skeleton.Node>
          </div>
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px] mt-1">
          <Skeleton.Node
            active
            style={{
              width: "20vw",
              maxWidth: "400px",
              minWidth: "370px",
              height: "300px",
            }}
          >
            <div></div>
          </Skeleton.Node>
        </div>
      </div>
    </div>
  );
}
