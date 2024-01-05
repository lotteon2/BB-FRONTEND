import { Button, Modal } from "antd";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { storeIdState } from "../../../recoil/atom/common";
import Loading from "../../common/Loading";
import { getSubscriptionsInfo } from "../../../apis/order";
import { subscriptionInfoDto } from "../../../recoil/common/interfaces";

interface param {
  selectedId: string;
  isModalOpen: boolean;
  handleCancel: () => void;
}
export default function SubscriptionInfoModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getSubscriptionsInfo", param.selectedId],
    queryFn: () => getSubscriptionsInfo(storeId, param.selectedId),
  });

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full max-h-[500px] overflow-auto">
      {data.data.data.map((item: subscriptionInfoDto) => (
        <div
          key={item.storeSubscriptionId}
          className="w-full flex flex-row gap-3 mt-2"
        >
          <div className="w-1/3">
            <img src={item.productThumbnailImage} alt="" />
          </div>
          <div className="w-2/3 flex flex-row gap-3">
            <div className="flex flex-col gap-1">
              <p>구독번호: </p>
              <p>상품명: </p>
              <p>결제 금액: </p>
              <p>받는 분 성함: </p>
              <p>연락처: </p>
              <p>주소: </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>{item.storeSubscriptionId}</p>
              <p>{item.productName}</p>
              <p>{item.productPrice.toLocaleString()}원</p>
              <p>{item.deliveryRecipientName}</p>
              <p>{item.deliveryRecipientPhoneNumber}</p>
              <p>
                {item.deliveryRoadName} {item.deliveryAddressDetail}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
