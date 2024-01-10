import { useState } from "react";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { Button } from "antd";
import { useQuery } from "react-query";
import { getStoreInfo } from "../../apis/store";
import StoreInfoFallback from "../fallbacks/StoreInfoFallback";
import StoreModifyModal from "./moddal/StoreModifyModal";

export default function StoreInfo() {
  const storeId = useRecoilValue<number>(storeIdState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComplete = () => {
    setIsChange((cur) => !cur);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getStoreInfo", isChange],
    queryFn: () => getStoreInfo(storeId),
  });

  if (!data || isLoading) return <StoreInfoFallback />;

  return (
    <div className="w-full h-full p-3 relative">
      <span className="text-xl font-bold">가게정보 관리</span>
      <Button
        className="absolute top-3 right-3"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        가게정보 수정
      </Button>
      <div className="flex flex-row gap-3 mt-2">
        <div className="w-[200px] h-[200px]">
          <img
            src={data.data.storeThumbnailImage}
            alt="가게 썸네일 이미지"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-3 text-[1rem]">
          <p className="text-[1.8rem] font-bold">{data.data.storeName}</p>
          <p className="text-grayscale5">
            {data.data.address + " " + data.data.addressDetail}
          </p>
          <p>연락처: {data.data.phoneNumber}</p>
          <p>대표계좌: {data.data.bank + " " + data.data.accountNumber}</p>
        </div>
      </div>
      <p className="mt-2 h-40 overflow-auto">{data.data.detailInfo}</p>
      {isModalOpen ? (
        <StoreModifyModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleComplete={handleComplete}
        />
      ) : (
        ""
      )}
    </div>
  );
}
