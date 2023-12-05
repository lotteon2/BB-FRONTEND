import { Select, Skeleton } from "antd";
import { reviewOptions } from "../../recoil/common/options";

export default function ReviewFallback() {
  return (
    <div className="relative">
      <div className="text-xl font-bold text-left">리뷰 관리</div>
      <span className="absolute right-0 top-0 text-left">
        <Select
          defaultValue="DATE"
          options={reviewOptions}
          style={{ width: 120 }}
        />
      </span>
      <div className="flex flex-col gap-1 text-center mt-3">
        <Skeleton.Node active style={{ width: 770, height: 150 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 150 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 150 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 150 }}>
          <div></div>
        </Skeleton.Node>
        <Skeleton.Node active style={{ width: 770, height: 150 }}>
          <div></div>
        </Skeleton.Node>
      </div>
    </div>
  );
}
