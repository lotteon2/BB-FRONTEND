import { Button, Modal } from "antd";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getReservationsInfo } from "../../../apis/order";
import { storeIdState } from "../../../recoil/atom/common";
import { reservationInfoDto } from "../../../recoil/common/interfaces";
import Loading from "../../common/Loading";

interface param {
  selectedId: string;
  isModalOpen: boolean;
  handleCancel: () => void;
}
export default function SubscriptionInfoModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getReservationsInfo", param.selectedId],
    queryFn: () => getReservationsInfo(storeId, param.selectedId),
  });

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
          {data.map((item: reservationInfoDto) => (
            <div
              key={item.pickupReservationId}
              className="w-full flex flex-row gap-3 mt-2"
            >
              <div className="w-1/3">
                <img src={item.productThumbnailImage} alt="" />
              </div>
              <div className="w-2/3 flex flex-row gap-3">
                <div className="flex flex-col gap-1">
                  <p>예약번호: </p>
                  <p>상품명: </p>
                  <p>결제 금액: </p>
                  <p>예약자명: </p>
                  <p>연락처: </p>
                  <p>픽업일시: </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{item.reservationCode}</p>
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
          ))}
        </div>
      </Modal>
    </div>
  );
}
