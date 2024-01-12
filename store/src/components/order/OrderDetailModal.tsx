import { Button, Modal, Select, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { SuccessToast } from "../common/toast/SuccessToast";
import { FailToast } from "../common/toast/FailToast";
import { productRead } from "../../recoil/common/interfaces";
import {
  deliverStatusFirst,
  deliverStatusSecond,
} from "../../recoil/common/options";
import { getOrderDetail, modifyOrderState } from "../../apis/order";

interface param {
  isChange: boolean;
  setIsChange: (cur: boolean) => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  orderGroupId: string;
}
export default function OrderDetailModal(param: param) {
  const [orderState, setOrderState] = useState<string>("");

  //   const data = orderDetailData;
  const { data, isLoading } = useQuery({
    queryKey: ["getOrderDetailInfo", param],
    queryFn: () => getOrderDetail(param.orderGroupId),
  });

  const handleOrderState = (id: string) => {
    modifyMutation.mutate(id);
  };

  const modifyMutation = useMutation(
    ["modifyOrderState"],
    (id: string) => modifyOrderState(orderState, id),
    {
      onSuccess: () => {
        param.setIsChange(!param.isChange);
        SuccessToast("수정되었습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    if (data && !orderState) {
      setOrderState(data.data.orderDeliveryStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || isLoading) return null;

  return (
    <div>
      <Modal
        title={"주문 번호 " + data.data.orderGroupId.split("-")[0]}
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        footer={<Button onClick={param.handleCancel}>닫기</Button>}
      >
        <div className="flex flex-row">
          <Tag
            bordered={false}
            color={
              data.orderDeliveryStatus === "PENDING"
                ? "purple"
                : data.orderDeliveryStatus === "PROCESSING"
                ? "green"
                : ""
            }
          >
            {data.orderDeliveryStatus === "PENDING"
              ? "주문 접수"
              : data.orderDeliveryStatus === "PROCESSING"
              ? "배송 시작"
              : "배송 완료"}
          </Tag>
          <Tag bordered={false}>결제일시: {data.data.paymentDate}</Tag>
        </div>

        <div className="w-full h-[500px] overflow-auto">
          <div className="flex flex-col gap-5 w-full mt-3">
            {data.data.products.map((item: productRead) => (
              <div className="flex flex-row w-full gap-3" key={item.productId}>
                <div className="w-1/4">
                  <img src={item.thumbnailImage} alt="" />
                </div>
                <div className="w-3/4 text-[0.9rem]">
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2">
                      <div>상품명: </div>
                      <div>상품 금액: </div>
                      <div>주문 수량: </div>
                      <div>주문 금액: </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>{item.name}</div>
                      <div>{item.price.toLocaleString()}원</div>
                      <div>{item.quantity.toLocaleString()}개</div>
                      <div>{item.totalAmount.toLocaleString()}원</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="font-bold">
              할인 금액:{" "}
              <span className="text-[#FF0000]">
                {data.data.couponAmount.toLocaleString()}원
              </span>
            </p>
            <p className="font-bold text-lg">
              총 결제 금액:{" "}
              <span className="text-primary1">
                {data.data.paymentAmount.toLocaleString()}원
              </span>
            </p>
            <div className="flex flex-row gap-5">
              <p className="text-md font-bold mt-1">주문 상태: </p>
              <div className="flex flex-row gap-2">
                {data.data.orderDeliveryStatus === "PENDING" ||
                data.data.orderDeliveryStatus === "PROCESSING" ? (
                  <Select
                    style={{ width: 100 }}
                    defaultValue={data.data.orderDeliveryStatus}
                    options={
                      data.data.orderDeliveryStatus === "PENDING"
                        ? deliverStatusFirst
                        : deliverStatusSecond
                    }
                    onChange={(e) => setOrderState(e)}
                  />
                ) : (
                  <Select
                    defaultValue={data.data.orderDeliveryStatus}
                    disabled
                    options={deliverStatusFirst}
                  />
                )}
                {data.data.orderDeliveryStatus === "DELIVERY_COMPLETED" ? (
                  ""
                ) : (
                  <Button
                    onClick={() => handleOrderState(data.data.orderDeliveryId)}
                    type="primary"
                  >
                    변경 완료
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold mb-2">배송지 정보</p>
            <div className="flex flex-row text-[1rem] gap-5">
              <div className="flex flex-col gap-5">
                <div>받는 분 성함: </div>
                <div>연락처: </div>
                <div>주소: </div>
              </div>
              <div className="flex flex-col gap-5">
                <div>{data.data.recipientName}</div>
                <div>{data.data.recipientPhoneNumber}</div>
                <div>
                  <p>{data.data.zipcode}</p>
                  <p>{data.data.roadName}</p>
                  <p>{data.data.addressDetail}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold mb-2">요청사항</p>
            <div className="w-full text-[1rem]">
              {data.data.deliveryRequest}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
