import { Button, Form, Input, Modal, Tag } from "antd";
import {
  orderInfoForStore,
  productRead,
} from "../../../recoil/common/interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewRegisterModal from "../modal/ReviewRegisterModal";
import { useMutation, useQuery } from "react-query";
import { cancelDeliveryOrder, getDeliveryDetail } from "../../../apis/order";
import Loading from "../../common/Loading";
import { useSetRecoilState } from "recoil";
import { mallState } from "../../../recoil/atom/common";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";

interface param {
  id: string;
  type: string;
}

const { TextArea } = Input;

export default function OrderInfo(param: param) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [productOrderId, setProductOrderId] = useState<number>(0);
  const [isChange, setIsChange] = useState<boolean>(false);
  const setIsMall = useSetRecoilState<boolean>(mallState);

  const { data, isLoading } = useQuery({
    queryKey: ["getDeliveryDetail", isChange],
    queryFn: () => getDeliveryDetail(param.id),
  });

  const handleChange = () => {
    setIsChange((cur) => !cur);
    setIsModalOpen(false);
  };

  const handleGiftcard = (status: string, id: number, productId: string) => {
    if (status === "ABLE")
      navigate("/giftcard/delivery/" + id + "/" + productId);
  };

  const handleReviewModalOpen = (productId: string, orderProductId: number) => {
    setProductId(productId);
    setProductOrderId(orderProductId);
    setIsModalOpen(true);
  };

  const handleDeliveryProduct = (id: string) => {
    navigate("/product/detail/" + id);
    setIsMall(true);
  };

  const handleCancelOrder = (orderDeliveryId: string) => {
    if (window.confirm("선택된 주문을 취소하시겠습니까?")) {
      cancelMutation.mutate(orderDeliveryId);
    }
  };

  const cancelMutation = useMutation(
    ["deliveryCancel"],
    (orderDeliveryId: string) => cancelDeliveryOrder(orderDeliveryId),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        SuccessToast("주문이 취소되었습니다.");
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
                주문번호: {data.data.orderGroupId.split("-")[0]}
              </p>
            </div>
            {data.data.orderDeliveries.map((item: orderInfoForStore) => (
              <div
                className="border-[1px] border-grayscale3 mt-3 relative rounded-lg"
                key={item.storeId}
              >
                <div className="bg-grayscale2 pl-2 py-1 flex justify-between">
                  <p>{item.storeName}</p>
                  <Tag color="#315136">
                    {item.orderDeliveryStatus === "PENDING"
                      ? "주문접수"
                      : item.orderDeliveryStatus === "PROCESSING"
                      ? "배송시작"
                      : item.orderDeliveryStatus === "COMPLETED"
                      ? "배송완료"
                      : "취소완료"}
                  </Tag>
                </div>
                {item.products.map((product: productRead) => (
                  <div className="p-2 border-b-[1px]" key={product.productId}>
                    <p
                      className="text-[1.2rem] font-bold cursor-pointer"
                      onClick={() => handleDeliveryProduct(product.productId)}
                    >
                      {product.name}
                    </p>
                    <div className="h-full flex flex-row justify-between flex-wrap align-center">
                      <div className="flex flex-row gap-2">
                        <div className="w-[150px] h-[150px]">
                          <img
                            className="w-full h-full rounded-lg"
                            src={product.thumbnailImage}
                            alt="상품 이미지"
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                          <div className="flex flex-row gap-3">
                            <span className="border-[1px] px-2 py-1 rounded-lg">
                              가격
                            </span>
                            <span className="mt-1">
                              {product.price.toLocaleString()}원
                            </span>
                          </div>
                          <div className="flex flex-row gap-3">
                            <span className="border-[1px] px-2 py-1 rounded-lg">
                              수량
                            </span>
                            <span className="mt-1">
                              {product.quantity.toLocaleString()}개
                            </span>
                          </div>
                          <div className="font-bold text-[1.5rem]">
                            {product.totalAmount.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 my-auto max-[1200px]:w-full max-[1200px]:justify-end">
                        <div className="flex flex-row gap-2">
                          <Button
                            disabled={
                              product.reviewStatus === "ABLE" ? false : true
                            }
                            onClick={() =>
                              product.reviewStatus === "ABLE"
                                ? handleReviewModalOpen(
                                    product.productId,
                                    product.orderProductId
                                  )
                                : ""
                            }
                          >
                            {product.reviewStatus === "DONE"
                              ? "작성 완료"
                              : "리뷰 작성"}
                          </Button>
                          <Button
                            disabled={
                              product.cardStatus === "ABLE" ? false : true
                            }
                            type="primary"
                            onClick={() =>
                              handleGiftcard(
                                product.cardStatus,
                                product.orderProductId,
                                product.productId
                              )
                            }
                          >
                            {product.cardStatus === "DONE"
                              ? "작성 완료"
                              : "카드 작성"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t-[1px]"></div>
                {item.orderDeliveryStatus === "PENDING" ? (
                  <div>
                    <div className="m-1 flex justify-end">
                      <Button
                        className="my-2 "
                        onClick={() => handleCancelOrder(item.orderDeliveryId)}
                      >
                        주문 취소
                      </Button>
                    </div>
                    <div className="border-t-[1px]"></div>
                  </div>
                ) : (
                  ""
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
                      <p>{item.totalAmount.toLocaleString()}원</p>
                      <p className="text-[#FF5555]">
                        {item.couponAmount.toLocaleString()}원
                      </p>
                      <p>{item.deliveryCost.toLocaleString()}원</p>
                      <p className="font-bold text-primary4">
                        {item.paymentAmount.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Form
            name="orderForm"
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
                  <Input value={data.recipientName} disabled />
                </Form.Item>
                <Form.Item name="recipientPhoneNumber" label="연락처">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="zipcode" label="주소">
                  <Input value={data.zipcode} disabled />
                </Form.Item>
                <Form.Item name="roadName" label=" ">
                  <Input value={data.roadName} disabled />
                </Form.Item>
                <Form.Item name="addressDetail" label=" ">
                  <Input value={data.addressDetail} disabled />
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
        <div className="w-[20vw] max-w-[400px] min-w-[370px] sticky top-0">
          <div className="flex flex-row justify-between border-b-[1px] border-grayscale7 text-[1.5rem]">
            <p>결제 금액</p>
            <p className="text-[1rem] pt-3 text-grayscale5 font-light">
              {data.data.paymentDate.split("T")[0]}{" "}
              {data.data.paymentDate.split("T")[1].split(".")[0]}
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
              <p>{data.data.totalAmount.toLocaleString()}원</p>
              <p className="text-[#FF5555]">
                {data.data.couponAmount.toLocaleString()}원
              </p>
              <p>{data.data.deliveryCost.toLocaleString()}원</p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {data.data.paymentAmount.toLocaleString()}원
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
          productOrderId={productOrderId.toString()}
          reviewType={"DELIVERY"}
          handleChange={handleChange}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
}
