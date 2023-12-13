import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  cancelSubscription,
  getMySubscriptionList,
} from "../../../apis/member";
import { mySubscriptionsData } from "../../../mocks/mypage";
import { mySubscriptionItemDto } from "../../../recoil/common/interfaces";
import { Button, Empty } from "antd";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";
import Swal from "sweetalert2";
import MypageDivFallback from "../../fallbacks/MypageDivFallback";
import { useNavigate } from "react-router-dom";

export default function MySubscription() {
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState<boolean>(false);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getMySubscriptionList", isChange],
  //   queryFn: () => getMySubscriptionList(),
  // });

  const handleCancel = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    Swal.fire({
      title: `<p style='text-align: center'>구독을 취소하시겠습니까?</p>`,
      text: " 이전 결제건에 대해서는 정상적으로 배송이 이루어지며, 이후 결제 및 배송이 진행되지 않습니다.",
      iconHtml:
        '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#DC2626", // confrim 버튼 색깔 지정
      cancelButtonColor: "#808080", // cancel 버튼 색깔 지정
      confirmButtonText: "구독취소", // confirm 버튼 텍스트 지정
      cancelButtonText: "닫기", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
      background: "#FFFFFF",
      color: "#212B36",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      } else {
        // 모달창에서 cancel 버튼을 눌렀다면
      }
    });
  };

  const cancelMutation = useMutation(
    ["cancelSubscription"],
    (subscriotionId: string) => cancelSubscription(subscriotionId),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        SuccessToast("취소되었습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  // if (!data || isLoading) return <MypageDivFallback />;

  const data = mySubscriptionsData;

  return (
    <div>
      {data.data.length === 0 ? (
        <Empty description="구독중인 상품이 없습니다." />
      ) : (
        <div className="flex flex-row gap-5 flex-wrap justify-center mt-3">
          {data.data.map((item: mySubscriptionItemDto) => (
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
              <div className="flex justify-end">
                <Button
                  size="large"
                  type="primary"
                  onClick={(e) => handleCancel(e, item.subscriptionId)}
                >
                  구독 취소
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
