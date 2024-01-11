import { useRecoilState } from "recoil";
import {
  orderDto,
  orderInfoByStore,
  productCreate,
} from "../../recoil/common/interfaces";
import { orderState } from "../../recoil/atom/order";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { getMyInfo } from "../../apis/member";
import { FailToast } from "../common/toast/FailToast";
import { Modal, Form, Input, Button } from "antd";
import MyCouponModal from "./modal/MyCouponModal";
import PayIcon from "../../assets/images/pay.png";
import DaumPostcodeEmbed from "react-daum-postcode";
import RecentDeliveryPlaceModal from "./modal/RecentDeliveryPlaceModal";
import { useNavigate } from "react-router-dom";
import { paymentDeliveryMultiProducts } from "../../apis/order";

const { TextArea } = Input;

export default function CartOrderDetail() {
  const ButtonRef = useRef<HTMLButtonElement | null>(null);
  const [order, setOrder] = useRecoilState<orderDto>(orderState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isRecentDeliveryOpen, setIsRecentDeliveryOpen] =
    useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = useState<number>(0);
  const [totalActualAmount, setTotalActualAmount] = useState<number>(0);
  const [totalCouponAmount, setTotalCouponAmount] = useState<number>(0);
  const navigate = useNavigate();

  const email_pattern =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+.[a-zA-Z]+$/i;
  const blank_pattern = "/^s+|s+$/g";

  const handleMyInfo = () => {
    getMyInfoMutation.mutate();
  };

  const handleCoupons = (couponId: number | null, couponAmount: number) => {
    const tmpList: orderInfoByStore[] = [];

    order.orderInfoByStores.forEach((item: orderInfoByStore, idx: number) => {
      if (idx === index) {
        const tmp = {
          storeId: order.orderInfoByStores[index].storeId,
          storeName: order.orderInfoByStores[index].storeName,
          products: order.orderInfoByStores[index].products,
          totalAmount: order.orderInfoByStores[index].totalAmount,
          deliveryCost: order.orderInfoByStores[index].deliveryCost,
          couponId: couponId,
          couponAmount: couponAmount,
          actualAmount:
            order.orderInfoByStores[index].actualAmount - couponAmount,
        };
        tmpList.push(tmp);
      } else {
        tmpList.push(item);
      }
    });

    setOrder((prev) => ({
      ...prev,
      orderInfoByStores: tmpList,
      sumOfActualAmount: order.sumOfActualAmount - couponAmount,
    }));

    setTotalCouponAmount((prev) => prev + couponAmount);
    setTotalActualAmount((prev) => prev - couponAmount);
    handleCancel();
  };

  const handleOrder = () => {
    if (
      order.ordererName !== "" &&
      order.ordererEmail !== "" &&
      order.ordererPhoneNumber !== "" &&
      order.deliveryZipcode !== "" &&
      order.deliveryRoadName !== "" &&
      order.recipientName !== "" &&
      order.recipientPhone !== ""
    ) {
      paymentMutation.mutate();
    }
  };

  const paymentMutation = useMutation(
    ["paymentDeliveryMultiProducts"],
    () => paymentDeliveryMultiProducts(order),
    {
      onSuccess: (data) => {
        const width = 370; // 팝업의 가로 길이: 500
        const height = 500; // 팝업의 세로 길이 : 500
        // 팝업을 부모 브라우저의 정 중앙에 위치시킨다.
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
          data.data.next_redirect_pc_url,
          "BB 카카오페이 QR 결제",
          `width=${width},height=${height},left=${left},top=${top}`
        );
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRecentDeliveryOpen(false);
  };

  const handleComplete = (data: any) => {
    var roadAddr = data.roadAddress; // 도로명 주소 변수
    var extraRoadAddr = ""; // 참고 항목 변수

    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    // 건물명이 있고, 공동주택일 경우 추가한다.
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }
    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    if (extraRoadAddr !== "") {
      extraRoadAddr = " (" + extraRoadAddr + ")";
    }

    setOrder((prev) => ({
      ...prev,
      deliveryZipcode: data.zonecode,
      deliveryRoadName: roadAddr,
    }));
    setIsAddressModalOpen(false);
  };

  const handleCouponModal = (index: number) => {
    setIndex(index);
    setIsModalOpen(true);
  };

  const getMyInfoMutation = useMutation(["getMyInfo"], () => getMyInfo(), {
    onSuccess: (data) => {
      setOrder((prev) => ({
        ...prev,
        ordererName: data.data.data.nickname,
        ordererEmail: data.data.data.email,
        ordererPhoneNumber: data.data.data.phoneNumber,
      }));
    },
    onError: () => {
      FailToast(null);
    },
  });

  const rightEmail = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("이메일을 입력해주세요."));
    }
    if (!email_pattern.test(value)) {
      return Promise.reject(new Error("이메일 형식으로 입력해주세요."));
    }
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const rightName = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("이름을 입력해주세요."));
    }
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const rightPhoneNumber = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("핸드폰번호를 입력해주세요."));
    }
    if (isNaN(Number(value))) {
      return Promise.reject(new Error("숫자만 입력해주세요."));
    }
    if (value.length < 11) {
      return Promise.reject(new Error("정확한 핸드폰번호를 입력해주세요."));
    }
    return Promise.resolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rightRoadName = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("필수 입력값입니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickPayButton = useCallback(() => {
    ButtonRef.current?.click();
    handleOrder();
    return Promise.resolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, order]);

  const handleMessage = (ev: any) => {
    console.log(ev);
    // if (ev.origin !== "https://blooming.blooms.mall.stockey.kr") return;

    const message = ev.data.state;

    if (message === "approve") {
      navigate("/success");
    } else if (message === "fail") {
      navigate("/fail");
    }
  };

  useEffect(() => {
    (() => {
      window.addEventListener("message", handleMessage);
    })();
    return () => {
      window.removeEventListener("message", handleMessage);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    var totalAmount = 0;
    var totalDelivery = 0;
    var totalActualAmount = 0;
    var couponIds: number[] = [];
    var couponAmounts: number[] = [];

    order.orderInfoByStores.forEach((item: orderInfoByStore) => {
      totalAmount += item.totalAmount;
      totalDelivery += item.deliveryCost;
      totalActualAmount += item.actualAmount;
      couponIds.push(0);
      couponAmounts.push(0);
    });

    setTotalAmount(totalAmount);
    setTotalDeliveryCost(totalDelivery);
    setTotalActualAmount(totalActualAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div>
            <p className="border-b-[1px] border-grayscale7 text-[1.5rem]">
              주문상품 정보
            </p>
            {order.orderInfoByStores.map(
              (item: orderInfoByStore, index: number) => (
                <div
                  className="border-[1px] border-grayscale3 mt-3 relative"
                  key={item.storeId}
                >
                  <div className="bg-grayscale2 px-2 py-1">
                    {item.storeName}
                  </div>
                  <div className="absolute top-1 right-2">
                    배송:{" "}
                    {item.deliveryCost === 0
                      ? "무료배송"
                      : item.deliveryCost.toLocaleString()}
                  </div>
                  {item.products.map((product: productCreate) => (
                    <div className="p-2" key={product.productId}>
                      <p className="text-[1.2rem] font-bold">
                        {product.productName}
                      </p>
                      <div className="h-full flex flex-row justify-between flex-wrap align-center">
                        <div className="flex flex-row gap-2">
                          <div className="w-[150px] h-[150px]">
                            <img
                              className="w-full h-full"
                              src={product.productThumbnailImage}
                              alt="상품 이미지"
                            />
                          </div>
                          <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                            <div className="flex flex-row gap-3">
                              <span className="border-[1px] px-2 py-1 rounded-lg">
                                수량
                              </span>
                              <span className="mt-1">
                                {product.quantity.toLocaleString()}개
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[1.5rem] my-auto max-[1200px]:w-full max-[1200px]:text-right">
                          {(product.price * product.quantity).toLocaleString()}
                          원
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t-[1px]"></div>
                  <div className="flex flex-row p-2 justify-between">
                    <div className="mt-12">
                      <Button
                        size="large"
                        onClick={() => handleCouponModal(index)}
                      >
                        쿠폰 사용
                      </Button>
                    </div>
                    <div className="flex flex-row gap-16 text-[1.2rem]">
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
                          {item.actualAmount.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <Form
            form={form}
            name="cartOrderForm"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: "100%" }}
            autoComplete="off"
            initialValues={order}
            onFinish={handleOrder}
          >
            {/* 주문자 정보 */}
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7  relative">
                <p className="text-[1.5rem]">주문자</p>
                <div className="absolute bottom-1 right-0">
                  <Button onClick={handleMyInfo}>내 정보 불러오기</Button>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item
                  name="ordererName"
                  label="성함"
                  rules={[
                    {
                      required: true,
                      validator: rightName,
                    },
                  ]}
                >
                  <Input
                    value={order.ordererName}
                    placeholder="성함을 입력해주세요."
                    maxLength={6}
                    showCount
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        ordererName: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="ordererPhoneNumber"
                  label="연락처"
                  rules={[
                    {
                      required: true,
                      validator: rightPhoneNumber,
                    },
                  ]}
                >
                  <Input
                    value={order.ordererPhoneNumber}
                    placeholder="연락처를 입력해주세요(- 없이 숫자만 입력해주세요)"
                    maxLength={11}
                    minLength={11}
                    showCount
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        ordererPhoneNumber: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="ordererEmail"
                  label="이메일"
                  rules={[
                    {
                      required: true,
                      validator: rightEmail,
                    },
                  ]}
                >
                  <Input
                    value={order.ordererEmail}
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        ordererEmail: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
            </div>
            {/* 배송지 정보 */}
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7  relative">
                <p className="text-[1.5rem]">배송지</p>
                <div className="flex flex-row gap-2 absolute bottom-1 right-0">
                  <Button
                    onClick={() =>
                      setOrder((prev) => ({
                        ...prev,
                        recipientName: prev.ordererName,
                        recipientPhone: prev.ordererPhoneNumber,
                      }))
                    }
                  >
                    주문자 정보와 동일
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setIsRecentDeliveryOpen(true)}
                  >
                    최근 배송지 불러오기
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item
                  name="recipientName"
                  label="성함"
                  rules={[
                    {
                      required: true,
                      validator: rightName,
                    },
                  ]}
                >
                  <div>
                    <Input
                      value={order.recipientName}
                      placeholder="성함을 입력해주세요."
                      maxLength={6}
                      showCount
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          recipientName: e.target.value,
                        }))
                      }
                    />
                    {/* <div className="hidden">{order.recipientName}</div> */}
                  </div>
                </Form.Item>
                <Form.Item
                  name="recipientPhone"
                  label="연락처"
                  rules={[
                    {
                      required: true,
                      validator: rightPhoneNumber,
                    },
                  ]}
                >
                  <Input
                    value={order.recipientPhone}
                    placeholder="연락처를 입력해주세요(- 없이 숫자만 입력해주세요)"
                    maxLength={11}
                    minLength={11}
                    showCount
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        recipientPhone: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="deliveryZipcode"
                  label="주소"
                  rules={[
                    {
                      required: true,
                      message: "필수 입력값입니다.",
                    },
                  ]}
                >
                  <div className="flex flex-row gap-2">
                    <Input
                      value={order.deliveryZipcode}
                      placeholder="우편번호"
                      disabled
                    />
                    <Button onClick={() => setIsAddressModalOpen(true)}>
                      검색
                    </Button>
                  </div>
                </Form.Item>
                <Form.Item
                  name="deliveryRoadName"
                  label=" "
                  rules={[
                    {
                      validator: rightRoadName,
                    },
                  ]}
                >
                  <Input
                    value={order.deliveryRoadName}
                    placeholder="주소"
                    disabled
                  />
                </Form.Item>
                <Form.Item name="deliveryAddressDetail" label=" ">
                  <Input
                    value={order.deliveryAddressDetail}
                    placeholder="상세주소"
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        deliveryAddressDetail: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7  relative">
                <p className="text-[1.5rem]">요청 사항</p>
              </div>
              <div className="mt-3">
                <TextArea
                  value={order.deliveryRequest}
                  placeholder="요청사항을 입력해주세요."
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      deliveryRequest: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Button htmlType="submit" className="hidden" ref={ButtonRef}>
              결제
            </Button>
          </Form>
          {isAddressModalOpen && (
            <Modal
              title="주소 검색"
              open={isAddressModalOpen}
              onOk={() => setIsAddressModalOpen(false)}
              onCancel={() => setIsAddressModalOpen(false)}
              footer={[]}
            >
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px]">
          <p className="border-b-[1px] border-grayscale7 text-[1.5rem]">
            결제 금액
          </p>
          <div className="flex flex-row gap-20 w-full text-[1.2rem] justify-between">
            <div className="flex flex-col gap-2">
              <p>총 주문금액</p>
              <p>총 할인금액</p>
              <p>배송비</p>
              <p className="font-bold text-[1.5rem]">총 결제금액</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{totalAmount.toLocaleString()}원</p>
              <p className="text-[#FF5555]">
                {totalCouponAmount.toLocaleString()}원
              </p>
              <p>{totalDeliveryCost.toLocaleString()}원</p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {totalActualAmount.toLocaleString()}원
              </p>
            </div>
          </div>
          <p className="border-b-[1px] my-2"></p>
          <p className="text-right text-grayscale5">
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </p>
          <div
            className="flex flex-row py-3 justify-center gap-5 w-full bg-[#FFEB00] rounded-lg cursor-pointer hover:bg-[#FFEB00CC]"
            onClick={clickPayButton}
          >
            <img src={PayIcon} alt="" className="w-10" />
            <span className="text-[1.5rem] font-bold">카카오 페이</span>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <MyCouponModal
          handleCancel={handleCancel}
          handleCoupons={handleCoupons}
          storeId={order.orderInfoByStores[index].storeId}
          actualAmount={order.orderInfoByStores[index].actualAmount}
          couponId={0}
          couponAmount={0}
        />
      </Modal>
      <Modal
        open={isRecentDeliveryOpen}
        onCancel={handleCancel}
        footer={[]}
        title="최근 배송지"
      >
        <RecentDeliveryPlaceModal
          handleCancel={handleCancel}
          type="cart"
          addressId={order.deliveryAddressId}
        />
      </Modal>
    </div>
  );
}
