import { useQuery } from "react-query";
import { getStoreDetailInfo } from "../../apis/store";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router";
import StoreDetailFallback from "../fallbacks/StoreDetailFallback";

interface param {
  storeId: number;
}
export default function StoreInfo(param: param) {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["getStoreDetailInfo"],
    queryFn: () => getStoreDetailInfo(param.storeId),
  });

  if (!data || isLoading) return <StoreDetailFallback />;

  return (
    <div className="w-full h-full flex flex-row gap-5 flex-wrap justify-center">
      <div className="w-[20vw] min-w-[250px] max-w-[300px]">
        <img src={data.storeThumbnailImage} alt="" className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-2 w-[70vw] max-w-[1000px]">
        <div>
          <div className="flex flex-row gap-3">
            <p className="text-4xl font-bold">{data.storeName}</p>
            <div className="flex flex-row gap-1 text-primary4">
              <StarFilled />
              <span className="mt-2">{data.averageRating}</span>
            </div>
          </div>
          <p className="text-grayscale5 text-lg">
            {data.address} {data.detailAddress}
          </p>
          <p>{data.phoneNumber}</p>
          <p className="my-3 h-18 overflow-auto">{data.detailInfo}</p>
        </div>

        {data.isLiked ? (
          <div className="text-[#FF6464] text-[40px] flex justify-end">
            <HeartFilled />
          </div>
        ) : (
          <div className="text-grayscale5 text-[40px] flex justify-end">
            <HeartFilled />
          </div>
        )}
        <div className="flex justify-end">
          <Button
            style={{
              width: "20vw",
              height: 50,
              minWidth: "200px",
              maxWidth: "300px",
            }}
            type="primary"
            onClick={() => navigate("/subscription/detail/" + param.storeId)}
          >
            정기구독 신청
          </Button>
        </div>
      </div>
    </div>
  );
}
