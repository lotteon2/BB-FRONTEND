import { useState } from "react";
import { Button, Empty, Rate } from "antd";
import SubscriptionRegisterModal from "./moddal/SubscriptionRegisterModal";
import SubscriptionModifyModal from "./moddal/SubscriptionModifyModal";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { useQuery } from "react-query";
import { getSubscriptionInfo } from "../../apis/store";
import SubscriptionInfoFallback from "../fallbacks/SubscriptionInfoFallback";

export default function SubscriptionInfo() {
  const storeId = useRecoilValue<number>(storeIdState);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getSubscriptionInfo", isChange],
    queryFn: () => getSubscriptionInfo(storeId),
  });

  const handleCancel = () => {
    setIsRegisterModalOpen(false);
    setIsModalOpen(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  if (!data || isLoading) return <SubscriptionInfoFallback />;

  return (
    <div className="w-full h-full p-3 relative">
      {data.data === null ? (
        <div className="text-center">
          <Empty
            description="등록된 구독상품 정보가 없습니다."
            className="pt-32"
          />
          <Button className="mt-2" onClick={() => setIsRegisterModalOpen(true)}>
            구독상품 등록
          </Button>
        </div>
      ) : (
        <div>
          <span className="text-xl font-bold">구독상품 관리</span>
          <Button
            className="absolute top-3 right-3"
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            구독상품 수정
          </Button>
          <div className="flex flex-row gap-3 mt-2">
            <div className="w-[200px] h-[200px]">
              <img src={data.data.productThumbnail} alt="상품 썸네일 이미지" />
            </div>
            <div className="flex flex-col gap-3 text-[1.2rem]">
              <p className="text-[2rem] font-bold">{data.data.productName}</p>
              <p className="text-grayscale5">{data.data.productSummary}</p>
              <p className="text-primary1 font-bold text-[1.4rem]">
                {data.data.productPrice.toLocaleString()}원
              </p>
              <p>
                <Rate
                  allowHalf
                  defaultValue={data.data.averageRating}
                  disabled
                />
                <span className="text-[1rem] text-grayscale5 ml-2">
                  ({data.data.averageRating})
                </span>
              </p>
            </div>
          </div>
          <div className="mt-2 h-40 overflow-auto">
            <img
              src={data.data.productDescriptionImage}
              alt="싱픔정보 상세"
              className="w-full"
            />
          </div>
          {isModalOpen ? (
            <SubscriptionModifyModal
              isModalOpen={isModalOpen}
              handleCancel={handleCancel}
              handleChange={handleChange}
              data={data.data}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {isRegisterModalOpen ? (
        <SubscriptionRegisterModal
          isModalOpen={isRegisterModalOpen}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}
