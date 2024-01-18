import { useState, useRef, useEffect } from "react";
import { pickupOrderState } from "../../recoil/atom/order";
import { pickupOrderDto } from "../../recoil/common/interfaces";
import { useRecoilState } from "recoil";
import { Button, Form, Input, Modal } from "antd";
import PayIcon from "../../assets/images/pay.png";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { getMyInfo } from "../../apis/member";
import { FailToast } from "../common/toast/FailToast";
import MyCouponModal from "./modal/MyCouponModal";
import { useNavigate } from "react-router-dom";
import { paymentPickupSingleProduct } from "../../apis/order";

export default function PickupOrderDetail() {
  const navigate = useNavigate();
  const ButtonRef = useRef<HTMLButtonElement | null>(null);
  const [pickupOrder, setPickupOrder] =
    useRecoilState<pickupOrderDto>(pickupOrderState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const email_pattern =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+.[a-zA-Z]+$/i;
  const blank_pattern = "/^s+|s+$/g";

  const handleMyInfo = () => {
    getMyInfoMutation.mutate();
  };

  const handleCoupons = (couponId: number | null, couponAmount: number) => {
    setPickupOrder((prev) => ({
      ...prev,
      actualAmount: pickupOrder.totalAmount - couponAmount,
      couponId: couponId,
      couponAmount: couponAmount,
    }));
    handleCancel();
  };

  const handlePickupReservation = () => {
    if (
      pickupOrder.ordererName !== "" &&
      pickupOrder.ordererPhoneNumber !== "" &&
      pickupOrder.ordererEmail !== ""
    ) {
      pickupOrderMutation.mutate();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const clickPayButton = useCallback(() => {
    ButtonRef.current?.click();
    handlePickupReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickupOrderMutation = useMutation(
    ["pickupOrder"],
    () => paymentPickupSingleProduct(pickupOrder),
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
  const getMyInfoMutation = useMutation(["getMyInfo"], () => getMyInfo(), {
    onSuccess: (data) => {
      setPickupOrder((prev) => ({
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

  const handleMessage = (ev: any) => {
    if (ev.origin !== "https://blooming.blooms.shop.stockey.kr") return;

    const message = ev.data.state;

    if (message === "approve") {
      navigate("/success");
    } else if (message === "fail") {
      navigate("/fail");
    }
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(pickupOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, pickupOrder]);

  useEffect(() => {
    (() => {
      window.addEventListener("message", handleMessage);
    })();
    return () => {
      window.removeEventListener("message", handleMessage);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div>
            <p className="border-b-[1px] border-grayscale7 text-[1.5rem]">
              주문상품 정보
            </p>
            <div className="border-[1px] border-grayscale3 mt-3 relative">
              <div className="bg-grayscale2 px-2 py-1">
                {pickupOrder.storeName}
              </div>
              <div className="p-2">
                <p className="text-[1.2rem] font-bold">
                  {pickupOrder.product.productName}
                </p>
                <div className="h-full flex flex-row justify-between flex-wrap align-center">
                  <div className="flex flex-row gap-2">
                    <div className="w-[150px] h-[150px]">
                      <img
                        className="w-full h-full"
                        src={pickupOrder.product.productThumbnailImage}
                        alt="상품 이미지"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          수량
                        </span>
                        <span className="mt-1">
                          {pickupOrder.product.quantity.toLocaleString()}개
                        </span>
                      </div>
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          날짜
                        </span>
                        <span className="mt-1">{pickupOrder.pickupDate}</span>
                      </div>
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          시간
                        </span>
                        <span className="mt-1">{pickupOrder.pickupTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[1.5rem] my-auto max-[1200px]:w-full max-[1200px]:text-right">
                    {pickupOrder.actualAmount.toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="border-t-[1px]"></div>
              <div className="flex flex-row p-2 justify-between">
                <div className="mt-12">
                  <Button size="large" onClick={() => setIsModalOpen(true)}>
                    쿠폰 사용
                  </Button>
                </div>
                <div className="flex flex-row gap-16 text-[1.2rem]">
                  <div className="flex flex-col gap-2">
                    <p>총 주문금액</p>
                    <p>총 할인금액</p>
                    <p className="font-bold">총 결제금액</p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <p>{pickupOrder.totalAmount.toLocaleString()}원</p>
                    <p className="text-[#FF5555]">
                      {pickupOrder.couponAmount.toLocaleString()}원
                    </p>
                    <p>{pickupOrder.deliveryCost.toLocaleString()}원</p>
                    <p className="font-bold text-primary4">
                      {pickupOrder.actualAmount.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="border-b-[1px] border-grayscale7  relative">
              <p className="text-[1.5rem]">주문자</p>
              <div className="absolute bottom-1 right-0">
                <Button onClick={handleMyInfo}>내 정보 불러오기</Button>
              </div>
            </div>
            <Form
              name="pickupOrdererForm"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, width: "100%" }}
              autoComplete="off"
              initialValues={pickupOrder}
              onFinish={handlePickupReservation}
              form={form}
            >
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item
                  name="ordererName"
                  label="이름"
                  rules={[
                    {
                      required: true,
                      validator: rightName,
                    },
                  ]}
                >
                  <Input
                    value={pickupOrder.ordererName}
                    placeholder="이름을 입력해주세요."
                    maxLength={6}
                    showCount
                    onChange={(e) =>
                      setPickupOrder((prev) => ({
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
                    value={pickupOrder.ordererPhoneNumber}
                    placeholder="연락처를 입력해주세요(- 없이 숫자만 입력해주세요)"
                    maxLength={11}
                    minLength={11}
                    showCount
                    onChange={(e) =>
                      setPickupOrder((prev) => ({
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
                    value={pickupOrder.ordererEmail}
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) =>
                      setPickupOrder((prev) => ({
                        ...prev,
                        ordererEmail: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
              <Button htmlType="submit" className="hidden" ref={ButtonRef}>
                결제
              </Button>
            </Form>
          </div>
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px]">
          <p className="border-b-[1px] border-grayscale7 text-[1.5rem]">
            결제 금액
          </p>
          <div className="flex flex-row gap-20 w-full text-[1.2rem] justify-between">
            <div className="flex flex-col gap-2">
              <p>총 주문금액</p>
              <p>총 할인금액</p>
              <p className="font-bold text-[1.5rem]">총 결제금액</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{pickupOrder.actualAmount.toLocaleString()}원</p>
              <p className="text-[#FF5555]">
                {pickupOrder.couponAmount.toLocaleString()}원
              </p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {pickupOrder.actualAmount.toLocaleString()}원
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
          storeId={pickupOrder.storeId}
          actualAmount={pickupOrder.totalAmount}
          couponId={pickupOrder.couponId}
          couponAmount={pickupOrder.couponAmount}
          index={0}
          type="pickup"
        />
      </Modal>
    </div>
  );
}
