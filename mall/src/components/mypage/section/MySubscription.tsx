import { useQuery } from "react-query";
import { getMySubscriptionList } from "../../../apis/member";
import { mySubscriptionItemDto } from "../../../recoil/common/interfaces";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
import MypageDivFallback from "../../fallbacks/MypageDivFallback";

export default function MySubscription() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["getMySubscriptionList"],
    queryFn: () => getMySubscriptionList(),
  });

  if (!data || isLoading) return <MypageDivFallback />;

  return (
    <div>
      {data.data.data.length === 0 ? (
        <Empty description="구독중인 상품이 없습니다." className="my-10" />
      ) : (
        <div className="flex flex-row gap-5 flex-wrap justify-center my-5">
          {data.data.data.map((item: mySubscriptionItemDto) => (
            <div
              className="w-[370px] shadow-lg rounded-lg p-2 gap-3 cursor-pointer hover:shadow-none hover:border-2 hover:border-primary3"
              key={item.subscriptionId}
              onClick={() =>
                navigate("/order/detail/subscription/" + item.subscriptionId)
              }
            >
              <div className="flex flex-row gap-3">
                <img
                  src={item.subscriptionProductThumbnail}
                  alt="상품 썸네일"
                  className="w-32 h-32 rounded-lg"
                />
                <div className="flex flex-col gap-2 mt-2">
                  <p className="font-bold text-[1.2rem] mt-3">
                    {item.subscriptionProductName}
                  </p>
                  <p>다음 결제일: {item.paymentDate}</p>
                  <p>다음 배송일: {item.deliveryDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
