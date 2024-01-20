import { Button, Form, Input, Modal, Tag } from "antd";
import { useState } from "react";
import ReviewRegisterModal from "../modal/ReviewRegisterModal";
import { useMutation, useQuery } from "react-query";
import {
  cancelSubscriptionOrder,
  getSubscriptionDetail,
} from "../../../apis/order";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, mallState } from "../../../recoil/atom/common";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";

interface param {
  id: string;
}

const { TextArea } = Input;

export default function SubscriptionOrderInfo(param: param) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const setIsMall = useSetRecoilState<boolean>(mallState);

  const { data, isLoading } = useQuery({
    queryKey: ["getSubscriptionDetail", isChange],
    queryFn: () => getSubscriptionDetail(param.id, isLogin),
  });

  const handleChange = () => {
    setIsChange((cur) => !cur);
    setIsModalOpen(false);
  };

  const handleReviewModalOpen = (productId: string) => {
    setProductId(productId);
    setIsModalOpen(true);
  };

  const handleDeliveryProduct = () => {
    navigate("/subscription/product/detail/" + data.data.productId);
    setIsMall(true);
  };

  const handleCancelOrder = () => {
    if (
      window.confirm(
        "구독을 취소하시겠습니까? \n\n이전 결제건에 대해서는 정상적으로 배송이 이루어지며, 이후 결제 및 배송이 진행되지 않습니다."
      )
    ) {
      cancelMutation.mutate();
    }
  };

  const cancelMutation = useMutation(
    ["cancelSubscriptionOrder"],
    () => cancelSubscriptionOrder(param.id),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        SuccessToast("구독이 취소되었습니다.");
        navigate("/mypage");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div>
            <div className="flex flex-row justify-between border-b-[1px] border-grayscale7 text-[1.5rem]">
              <p>주문상품 정보</p>
              <p className="text-[1rem] pt-3">
                주문번호: {param.id.split("-")[0]}
              </p>
            </div>

            <div className="border-[1px] border-grayscale3 mt-3 relative rounded-lg">
              <div className="bg-grayscale2 pl-2 py-1 flex justify-between">
                <p>{data.data.storeName}</p>
                <Tag color="#315136">
                  {data.data.isUnsubscribed ? "취소완료" : "구독중"}
                </Tag>
              </div>
              <div className="p-2 border-b-[1px]">
                <p
                  className="text-[1.2rem] font-bold cursor-pointer"
                  onClick={() => handleDeliveryProduct()}
                >
                  {data.data.productName}
                </p>
                <div className="h-full flex flex-row justify-between flex-wrap align-center">
                  <div className="flex flex-row gap-2">
                    <div className="w-[150px] h-[150px]">
                      <img
                        className="w-full h-full rounded-lg"
                        src={data.data.productThumbnail}
                        alt="상품 이미지"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          가격
                        </span>
                        <span className="mt-1">
                          {data.data.unitPrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          수량
                        </span>
                        <span className="mt-1">
                          {data.data.quantity.toLocaleString()}개
                        </span>
                      </div>
                      <div className="font-bold text-[1.5rem]">
                        {data.data.totalOrderPrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 my-auto max-[1200px]:w-full max-[1200px]:justify-end">
                    <Button
                      disabled={
                        data.data.reviewStatus === "ABLE" ? false : true
                      }
                      onClick={() =>
                        data.data.reviewStatus === "ABLE"
                          ? handleReviewModalOpen(data.data.productId)
                          : ""
                      }
                    >
                      {data.data.reviewStatus === "DONE"
                        ? "작성 완료"
                        : "리뷰 작성"}
                    </Button>
                  </div>
                </div>
              </div>
              <p className="px-2 py-2">
                다음 결제일:{" "}
                <span className="font-bold">{data.data.nextPaymentDate}</span>
              </p>
              <p className="px-2 py-2">
                다음 배송일:{" "}
                <span className="font-bold">{data.data.nextDeliveryDate}</span>
              </p>
              <div className="border-t-[1px]"></div>
              {data.data.isUnsubscribed ? (
                ""
              ) : (
                <div>
                  <div className="m-1 flex justify-end">
                    <Button
                      className="my-2 "
                      onClick={() => handleCancelOrder()}
                    >
                      구독 취소
                    </Button>
                  </div>
                  <div className="border-t-[1px]"></div>
                </div>
              )}
              <div className="flex flex-row p-2">
                <div className="w-full flex flex-row justify-between gap-16 text-[1.2rem]">
                  <div className="flex flex-col gap-2">
                    <p>총 주문금액</p>
                    <p>총 할인금액</p>
                    <p>배송비</p>
                    <p className="font-bold">총 결제금액</p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <p>{data.data.totalOrderPrice.toLocaleString()}원</p>
                    <p className="text-[#FF5555]">
                      {data.data.totalDiscountPrice.toLocaleString()}원
                    </p>
                    <p>{data.data.deliveryPrice.toLocaleString()}원</p>
                    <p className="font-bold text-primary4">
                      {data.data.actualPrice.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Form
            name="subscriptionOrderDetailForm"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: "100%" }}
            autoComplete="off"
            initialValues={data.data}
          >
            {/* 주문자 정보 */}
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7 relative">
                <p className="text-[1.5rem]">주문자</p>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item name="ordererName" label="성함">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="ordererPhoneNumber" label="연락처">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="ordererEmail" label="이메일">
                  <Input disabled />
                </Form.Item>
              </div>
            </div>
            {/* 배송지 정보 */}
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7  relative">
                <p className="text-[1.5rem]">배송지</p>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item name="recipientName" label="성함">
                  <div>
                    <Input value={data.data.recipientName} disabled />
                  </div>
                </Form.Item>
                <Form.Item name="recipientPhoneNumber" label="연락처">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="zipcode" label="주소">
                  <div className="flex flex-row gap-2">
                    <Input value={data.data.zipcode} disabled />
                  </div>
                </Form.Item>
                <Form.Item name="roadName" label=" ">
                  <Input value={data.data.roadName} disabled />
                </Form.Item>
                <Form.Item name="addressDetail" label=" ">
                  <Input value={data.data.addressDetail} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7  relative">
                <p className="text-[1.5rem]">요청 사항</p>
              </div>
              <div className="mt-3">
                <TextArea
                  value={data.data.deliveryRequest}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  disabled
                />
              </div>
            </div>
          </Form>
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px]">
          <div className="flex flex-row justify-between border-b-[1px] border-grayscale7 text-[1.5rem]">
            <p>결제 금액</p>
            <p className="text-[1rem] pt-3 text-grayscale5 font-light">
              {data.data.paymentDateTime.split("T")[0]}{" "}
              {data.data.paymentDateTime.split("T")[1]}
            </p>
          </div>
          <div className="flex flex-row gap-20 w-full text-[1.2rem] justify-between">
            <div className="flex flex-col gap-2">
              <p>총 주문금액</p>
              <p>총 할인금액</p>
              <p>배송비</p>
              <p className="font-bold text-[1.5rem]">총 결제금액</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{data.data.totalOrderPrice.toLocaleString()}원</p>
              <p className="text-[#FF5555]">
                {data.data.totalDiscountPrice.toLocaleString()}원
              </p>
              <p>{data.data.deliveryPrice.toLocaleString()}원</p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {data.data.actualPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        title="리뷰 작성"
      >
        <ReviewRegisterModal
          productId={productId}
          productOrderId={param.id}
          reviewType={"SUBSCRIBE"}
          handleChange={handleChange}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
}
