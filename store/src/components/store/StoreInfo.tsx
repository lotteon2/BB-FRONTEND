import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { Button } from "antd";
import { useQuery } from "react-query";
import { getStoreInfo } from "../../apis/store";
import StoreInfoFallback from "../fallbacks/StoreInfoFallback";

export default function StoreInfo() {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getStoreInfo"],
    queryFn: () => getStoreInfo(storeId),
  });

  if (!data || isLoading) return <StoreInfoFallback />;

  return (
    <div className="w-full h-full p-3 relative">
      <span className="text-xl font-bold">가게정보 관리</span>
      <Button className="absolute top-3 right-3" type="primary">
        가게정보 수정
      </Button>
      <div className="flex flex-row gap-3 mt-2">
        <div className="w-[200px] h-[200px]">
          <img src={data.storeThumbnailImage} alt="가게 썸네일 이미지" />
        </div>
        <div className="flex flex-col gap-3 text-[1.2rem]">
          <p className="text-[2rem] font-bold">{data.storeName}</p>
          <p className="text-grayscale5">
            {data.address + " " + data.addressDetail}
          </p>
          <p>{data.phoneNumber}</p>
          <p>{data.bank + " " + data.accountNumber}</p>
        </div>
      </div>
      <p className="mt-2 h-40 overflow-auto">{data.detailInfo}</p>
    </div>
  );
}
