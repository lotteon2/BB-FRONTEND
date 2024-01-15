import { Button, Modal } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation, useQuery } from "react-query";
import { cancelPickupOrder, getReservationsInfo } from "../../../apis/order";
import { deliveryState, storeIdState } from "../../../recoil/atom/common";
import { reservationInfoDto } from "../../../recoil/common/interfaces";
import Loading from "../../common/Loading";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";

interface param {
  selectedId: string;
  isModalOpen: boolean;
  handleCancel: () => void;
}
export default function SubscriptionInfoModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const [isChange, setIsChange] = useRecoilState<boolean>(deliveryState);

  const { data, isLoading } = useQuery({
    queryKey: ["getReservationsInfo", param.selectedId, isChange],
    queryFn: () => getReservationsInfo(storeId, param.selectedId),
  });

  const handleCancelOrder = (id: string) => {
    if (window.confirm("해당 주문을 거절하시겠습니까?")) {
      cancelMutation.mutate(id);
    }
  };

  const cancelMutation = useMutation(
    ["cancelPickupOrder"],
    (id: string) => cancelPickupOrder(id),
    {
      onSuccess: () => {
        SuccessToast("픽업 주문이 거절되었습니다.");
        param.handleCancel();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );
  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <Modal
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        title={param.selectedId.split(" ")[0] + " 픽업예약"}
        footer={<Button onClick={param.handleCancel}>닫기</Button>}
      >
        <div className="w-full max-h-[500px] overflow-auto">
          {data.data.data.map((item: reservationInfoDto) => (
            <div>
              <div
                key={item.pickupReservationId}
                className="w-full flex flex-row gap-3 mt-2"
              >
                <div className="w-1/3">
                  <img src={item.productThumbnailImage} alt="" />
                </div>
                <div className="w-2/3 flex flex-row gap-3">
                  <div className="w-20 flex flex-col gap-1">
                    <p>예약번호: </p>
                    <p>상품명: </p>
                    <p>결제 금액: </p>
                    <p>예약자명: </p>
                    <p>연락처: </p>
                    <p>픽업일시: </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>{item.reservationCode.split("-")[0]}</p>
                    <p>
                      {item.productName} / {item.count.toLocaleString()}개
                    </p>
                    <p>{item.orderPickupTotalAmount.toLocaleString()}원</p>
                    <p>{item.nickname}</p>
                    <p>{item.phoneNumber}</p>
                    <p>
                      {item.pickupDate} {item.pickupTime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleCancelOrder(item.pickupReservationId)}
                >
                  주문 거절
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
